
var app = require("express")();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var port = process.env.PORT || 9235;

http.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});

//database 
io.use((socket, next) => {
    //throw 'Khong cho phep'; //tu choi khong cho connect
    next();
});
/////////////////////////////
io.on('connection', (socket) => {
    //console.log(socket);
    console.log('ket noi socket');

    socket.on('disconnect', function () {
        console.log('Disconnect from: (');
    });
    
    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('users-changed', { user: nickname, event: 'joined' });
    });

    socket.on('add-message', (message) => {
        io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
    });
});

console.log('io:');
console.log(io);