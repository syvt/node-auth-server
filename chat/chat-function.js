const jwtConfig = require('../jwt/jwt-config');
const jwt = require('jsonwebtoken');
const chatConfig = require('./chat-config');

var tokenVerify = (socket,token) => {
      var tokenObj = jwt.decode(token);
      //console.log(socket.agentUser);
      if (socket.agentUser){
        //console.log(jwtConfig.secret + socket.agentUser.ip + socket.agentUser.device_info + (tokenObj ? tokenObj.req_time : ''));
        return jwt.verify(token
          , (jwtConfig.secret + socket.agentUser.ip + socket.agentUser.device_info + (tokenObj ? tokenObj.req_time : ''))
          , (err, decoded) => {
            if (err) {
              return false;
            } else {
              socket.user = decoded;
              return true
            }
          });
      }
        return false;
  };



  /**
   * Lay toan bo user
   * @param {*} adapterRooms 
   */
  var getUserChatList = (adapterRooms)=>{
    let users=[];
    for (room in adapterRooms){
      if (room.indexOf(chatConfig.userType)==0){
        for (socket in adapterRooms[room].sockets){
          users.push({id:socket, username:room})
        }
      }
    }
    return users;
  }

  /**
   * Lay toan bo room 
   * @param {*} adapterRooms 
   * @param {*} userIDs 
   */
  var getAllRoomChatList = (adapterRooms,userIDs)=>{
    let rooms=[];
    for (room in adapterRooms){
      if (room.indexOf(chatConfig.roomType)==0){
        let users = [];
        let length = adapterRooms[room].length;
        for (socket in adapterRooms[room].sockets){
          let username = userIDs.find(x => x.id === socket).username;//tim id trong array
          users.push({id:socket, username:username})
        }
        rooms.push({name:room,length:length,users:users});
      }
    }
    return rooms;
  }

  /**
   * chi lay room cua user dang log vao co tham gia thoi
   * @param {*} adapterRooms 
   * @param {*} userIDs 
   */
  var getRoomChatList = (adapterRooms,userIDs,mySocketId)=>{
    let rooms=[];
    for (room in adapterRooms){
      if (room.indexOf(chatConfig.roomType)==0){
        let users = [];
        let length = adapterRooms[room].length;
        for (socket in adapterRooms[room].sockets){
          if (socket==mySocketId){
            let username = userIDs.find(x => x.id === socket).username;//tim id trong array
            users.push({id:socket, username:username})
          }
        }
        rooms.push({name:room,length:length,users:users});
      }
    }
    return rooms;
  }

/**
 * Dang ky user vao chat
 * 
 * @param {*} io 
 * @param {*} socket 
 * @param {*} data 
 * 
 * NOTE RULE:
 * Room for user: $U#
 * Room for room: $R#
 * Room for sub room default by sys: /<dir>#id
 * Room for session default by sys: id
 * 
 * @output:
 * user + id
 * room in id
 * socket.emit : emit to just one socket
 * io.sockets.emit : emit to all sockets
 */
var registerUserRoom = (io,socket,data)=>{
    if (tokenVerify(socket,data.token)){
      if (socket.user&&socket.user.username){
        console.log('verify and join room user name: ' + socket.user.username + ' container for ' + socket.id);
        socket.join(chatConfig.userType + socket.user.username);
      }

      if (data.rooms){
        data.rooms.forEach((value,index) => {
          socket.join(chatConfig.roomType + value.room_name);
        });
      }
      //users chua [{id,username}]
      let userIDs = getUserChatList(socket.adapter.rooms);
      console.log(userIDs);
      let rooms = getRoomChatList(socket.adapter.rooms,userIDs);
      console.log(rooms);

    /*
            socket.broadcast.to(r).emit('server-send-user-join-room',{
                          user: socket.user,
                          id: socket.id,
                          room: r,
                          time: new Date().getTime()
            });
    */
      //chi tra lai cho 
      //gui cho session
      /* socket.emit('server-send-room-chating',{
                                                user: socket.user,
                                                id: socket.id,
                                                rooms: rooms
        }); */
      
        //gui cho tat ca user bat duoc no
      io.sockets.emit('server-send-room-chating',{
                          user: socket.user,
                          id: socket.id,
                          time: new Date().getTime(),
                          rooms: rooms
        });

       // socket.broadcast.to('justin bieber fans').emit('new fan');
       // io.sockets.in('rammstein fans').emit('new non-fan');


        //thuc hien dang ky token id voi token
       
    

        //user se gui len room
        //server tra cho id gui len la da xac thuc dung
        
    }
    
}

module.exports = {
  registerUserRoom: registerUserRoom
};