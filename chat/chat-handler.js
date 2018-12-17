var io;
var countAppOnline = 0;
var countAll = 0;

class ChatHandler {

  /**
   * Gan bien io de xu ly trong handler
   * @param {*} mainIO 
   */
  setIO(mainIO){
    io = mainIO;
  }

  //chuyen doi mot so thong tin request sang socket truoc khi xu ly tiep
  /**
   * truoc khi cho xu ly tiep thi hay kiem tra quyen truy cap nay
   * @param {*} socket 
   * @param {*} next 
   */
  verify(socket, next) {
    console.log('Socket IO verify: ' + socket.id);
    let agentUser = {};
    if (socket.handshake && socket.handshake.headers) {

      let clientIp;
      if (socket.handshake.headers["client_ip"]){
        clientIp=socket.handshake.headers["client_ip"];
      }else if (socket.handshake.headers["x-real-ip"]){
        clientIp=socket.handshake.headers["x-real-ip"];
      }else if (socket.handshake.headers["x-forwarded-for"]){
        clientIp=socket.handshake.headers["x-forwarded-for"];
      }else if (socket.handshake.headers["remote_add"]){
        clientIp=socket.handshake.headers["remote_add"];
      }else{
        clientIp=socket.handshake.address;
      }

      agentUser.id = socket.id;
      agentUser.ip = clientIp;
      agentUser.time = socket.handshake.time;
      agentUser.local_time = (new Date()).toLocaleTimeString();
      agentUser.issued = socket.handshake.issued;
      agentUser.device_info = socket.handshake.headers['user-agent'];
      agentUser.origin = socket.handshake.headers.origin;
      socket.agentUser = agentUser; //gan lai cho socket de lay thong tin sau

    }else{
      throw 'Khong cho phep ket noi - headers undifined!';
    }

    console.log(socket.agentUser);
    next();
  }

  /**
   * khi gui vao / no se goi vao day sau khi verify
   * @param {*} socket 
   */
  rootChat(socket) {
    console.log('Socket IO root (' + ++countAll + ') on Connect: ' + socket.id);
    //xem co bao nhieu rooms
    console.log(socket.adapter.rooms);
    
    socket.on('disconnect', function () {
      console.log('disconnect (' + countAll-- + ')  on Root: ' + socket.id);

    });

    socket.on('error', function () {
      console.log('error: ' + socket.id, arguments);
    });

    //-----------client communicate-------------//
    //gui toan bo
    socket.send('hello client');

    //gui het
    io.emit("server-send-rooms", {});

    socket.on('room', function () {
      var args = slice.call(arguments);
      io.to(socket.id).emit.apply(socket, ['roomBack'].concat(args));
    });

    socket.on('broadcast', function (data) {
      var args = slice.call(arguments);
      socket.broadcast.emit.apply(socket, ['broadcastBack'].concat(args));
    });
    //------------end client communicate ----------//

  }


  //neu query boi duong dan thi no se goi vao day
  //vi du: /test thi se goi vao day
  appOnline(socket) {
    console.log('appOnline (' + ++countAppOnline + ') socket IO ROOM Connect #: ' + socket.id);
    socket.on('disconnect', function () {
      console.log('disconnect (' + countAppOnline-- + ') in appOnline #: ' + socket.id);
    });
  }

  //tra ve so luong session dang connect
  getOnlineCount() {
    return {
      count_app_online: countAppOnline,
      total: countAll
    }
  }

}

module.exports = {
  ChatHandler: new ChatHandler()
};