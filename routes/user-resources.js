const router = require('express').Router();
const systempath = require('path');
const mime = require('mime-types');
const fs = require('fs');

router.get('/user-image/*',(req,res,next)=>{
    let absoluteFileName = req.pathName.substring('/user-image/'.length);
    let fileRead = absoluteFileName.replace('/',systempath.sep);

    let contentType = 'image/jpeg';
    if (mime.lookup(fileRead)) contentType = mime.lookup(fileRead);
    fs.readFile(fileRead, { flag: 'r' }, function (error, data) {
        if (!error) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(error));
        }
    });
})


module.exports = router;