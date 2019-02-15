"use strict"

const request = require('request');
const url = require('url');
const systempath = require('path');
const mime = require('mime-types');
const fs = require('fs');

const getYourDevice = (req, res, next) =>{

    //req.ipInfo 
   request('https://ipinfo.io/'+req.clientIp+'/json', 
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //console.log('-->body', body);
                        let yourDeviceInfo = {
                            origin: req.origin
                            , device: req.headers["user-agent"]
                            , ip: req.clientIp
                            , method: req.method
                            , url: req.url
                            , path: req.pathName
                            , params: req.paramS
                            , ip_info: body
                        }
                      //console.log('-->yourDeviceInfo', yourDeviceInfo);
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(yourDeviceInfo));
                      
                    } else {
                        //console.log('-->error', error);
                        //cac thong so duoc xu ly trong cors-handler.js
                        let yourDevice = {
                            origin: req.origin
                            , device: req.headers["user-agent"]
                            , ip: req.clientIp
                            , method: req.method
                            , url: req.url
                            , path: req.pathName
                            , params: req.paramS
                        }
                        //console.log('-->yourDevice', yourDevice);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(yourDevice));
                    }
        });
}



module.exports = {
    getYourDevice: getYourDevice
};