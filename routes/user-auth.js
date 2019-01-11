const router = require('express').Router();

const authHandler = require('../handlers/auth-handler');
let handlers = authHandler.AuthHandler;
    setTimeout(()=>{
        handlers.init();
    },5000); //doi 5 giay de oracle ket noi va tao key truoc


//tra publickey cho client
router.get('/key-json', handlers.getPublickeyJson);

// Tien xu ly form login, post, reqister, va next(),
router.post('/login', handlers.login);

//Register user gửi lên form đăng ký
router.post('/register', handlers.register);

//kiem tra token va lay thong tin user 
router.get('/get-user', handlers.tokenCheck, handlers.getUserInfo);

//lay anh dai dien 
router.get('/get-avatar/*', handlers.tokenCheck, handlers.getAvatar);

//kiem tra token dung
router.get('/logout', handlers.tokenCheck, handlers.logout);

router.get('/authorize', handlers.tokenCheck, handlers.authorize);

//Register user thong tin chinh sua ca nhan
router.post('/edit', handlers.tokenCheck, handlers.formProcess, handlers.edit);

//Load anh dai dien
router.post('/edit-avatar', handlers.tokenCheck , handlers.editAvatar);

//load anh nen
router.post('/edit-background', handlers.tokenCheck , handlers.editBackground);

//send-sms - thuc hien xac thuc cho phep gui sms qua 9235 (gui sms hay smses)
router.post('/send-sms', handlers.jsonProcess, handlers.sendSMS);

module.exports = router;