"use strict"

const fs = require('fs');
const dirUpload = 'upload_files';
const systempath = require('path');
const formidable = require('formidable');

if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
  /**
   * body formdata => req.form_data (file save in dirUpload ) 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
var formProcess = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let formData = {};
      
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({message:'Parse Formdata Error', error: err}));
      } else {
        
        for (let key in fields) {
          //gan them thuoc tinh dynamic
          Object.defineProperty(formData, key, {
            value: fields[key], //gia tri bien duoc bind vao bindVars.p_in_0,1,...n
            writable: false, //khong cho phep sua du lieu sau khi gan gia tri vao
            enumerable: true //cho phep gan thanh thuoc tinh truy van sau khi hoan thanh
          });
        }
        for (let key in files) {
          //cu co file la luu vao roi tinh sau
          let curdatetime = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/-/g, '').replace(/:/g, '');
            var filenameStored = dirUpload + systempath.sep + curdatetime + "_"
              + files[key].size + "_"
              + files[key].name;

          fs.createReadStream(files[key].path)
              .pipe(fs.createWriteStream(filenameStored));
          //vi da tinh hop le cua token roi
          Object.defineProperty(formData, key, {
            value: filenameStored, //gia tri bien duoc bind vao bindVars.p_in_0,1,...n
            writable: false, //khong cho phep sua du lieu sau khi gan gia tri vao
            enumerable: true //cho phep gan thanh thuoc tinh truy van sau khi hoan thanh
          });
        }
        req.form_data = formData;
        next();
      }
    });
  }


  /**
   * body json => req.json_data
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
 var jsonProcess = (req, res, next) =>{

    let postDataString = '';
    req.on('data', (chunk) => {
        postDataString += chunk;
    });
    req.on('end', () => {
      try{
        req.json_data = JSON.parse(postDataString);
        next();
      }catch(err){
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({message:"No JSON parse Data",error:err}));
      }
    })
  }

  module.exports = {
    jsonProcess: jsonProcess,
    formProcess: formProcess
  };