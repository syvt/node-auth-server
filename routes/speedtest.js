const router = require('express').Router();

const speedtestHandler = require('../handlers/speedtest-handler');
let handlers = speedtestHandler.SpeedtestHandler;

//su dung ping, upload, replace ...
router.get('/empty',handlers.empty)

//phuong thuc upload test
router.post('/empty',handlers.emptyPost)

//lay dia chi ip va tra ve vi tri ip o dau 
router.get('/get-ip',handlers.getIp)

//tra ve mot goi tin danh gia toc do download
router.get('/download',handlers.download)

module.exports = router;