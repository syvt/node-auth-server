class ChatFunction {

    /**
     * Dang ky user vao chat
     * @param {*} io 
     * @param {*} socket 
     * @param {*} data 
     */
    registerUser(io,socket,data){
        console.log(data);
        console.log(io);
        console.log(socket);
    }

}

module.exports = {
    ChatFunction: new ChatFunction()
};