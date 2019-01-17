const router = require('express').Router();

const postHandler = require('../utils/post-handler');
const phoneHandler = require('../handlers/phone-handler')
//gui len so thue bao --> tra ve token temp -> key --> 1h 
router.post('/request-isdn', postHandler.jsonProcess, phoneHandler.requestIsdn);

//gui len token temp, key xac thuc -- tra ve token 24h
router.post('/confirm-key', postHandler.jsonProcess, phoneHandler.confirmKey);

//xac thuc xem token do co dung la may chu nay cap khong?, tra ve true or false thoi
router.post('/authorize-token', postHandler.jsonProcess, phoneHandler.authorizeToken);

//cap key khi co token xac thuc bang isdn
router.get('/key-json', phoneHandler.getPublickeyJson);

//chi co quyen admin moi truy van alive-session
router.get('/alive-session', phoneHandler.getAliveSession);

module.exports = router;