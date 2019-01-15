const jwtConfig = require('../jwt/jwt-config');
const url = require('url');
const fs = require('fs');
const dirUpload = 'upload_files';
if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
}

const systempath = require('path');
const mime = require('mime-types');

const formidable = require('formidable');

//const db = require('../db/sqlite3/sqlite-jwt-service.js');
const db = require('../db/oracle/oracle-jwt-service');
setTimeout(()=>{
  db.handler.init();
},3000); //doi 3 giay de oracle ket noi

const NodeRSA = require('node-rsa');
const MidlewareRSA = new NodeRSA(null, { signingScheme: 'pkcs1-sha256' });
var PUBLIC_KEY;

const jwt = require('jsonwebtoken');

var tokenSign = (req) => {
  let signTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  let secret = (jwtConfig.secret + req.clientIp + req.headers["user-agent"] + signTime)
  if (req.user && (req.user.USERNAME||req.user.username)) {
    console.log('Sign secret 1:', secret);
    return jwt.sign({
      username: req.user.USERNAME?req.user.USERNAME:req.user.username,
      nickname: (req.user.DISPLAY_NAME) ? req.user.DISPLAY_NAME : '',
      image: (req.user.URL_IMAGE) ? req.user.URL_IMAGE : '',//, //thong tin anh cua nguoi su dung
      req_time: signTime
    },
    secret
    , {
      expiresIn: '24h' // expires in 24 hours
    }
    );
  } else if (req.jsonData&&req.jsonData.isdn&&req.jsonData.key) {
    secret = (jwtConfig.secret + req.clientIp + req.headers["user-agent"] + signTime + req.jsonData.key)
    console.log('Sign secret 2:', secret);
    return jwt.sign({
      username: req.jsonData.isdn,
      req_device: req.headers["user-agent"],
      req_time: signTime
    },
    secret
      , {
        expiresIn: '1h' // expires in 1 hours
      }
    );
  } else 
  {
    secret = (jwtConfig.secret + req.clientIp + req.headers["user-agent"] + signTime);
    console.log('Sign secret 3:', secret);
    return jwt.sign({
      req_device: req.headers["user-agent"],
      req_time: signTime
    },
    secret
      , {
        expiresIn: '1h' // expires in 1 hours
      }
    );
  }
}

var tokenVerify = (req) => {
  if (req.token) {
    let token = req.token;
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    let tokenObj = jwt.decode(token);

    let secret = jwtConfig.secret + req.clientIp + req.headers["user-agent"] + (tokenObj?tokenObj.req_time:'') + (req.keyOTP?req.keyOTP:'') 
    console.log('Verify secret:',secret);
    return jwt.verify(token
        , secret
        , (err, decoded) => {
          if (err) {
            return false;
          } else {
            req.user = decoded;
            return true
          }
        })
  } else {
    return false;
  }
};


class AuthHandler {
  //khoi tao key
  init() {
    db.handler.
        createServiceKey(db.service_id)
        .then(serverkey => {
          MidlewareRSA.importKey(serverkey.PRIVATE_KEY);
          PUBLIC_KEY = {
            SERVICE_ID: serverkey.SERVICE_ID,
            PUBLIC_KEY: serverkey.PUBLIC_KEY,
            SERVICE_NAME: serverkey.SERVICE_NAME,
            IS_ACTIVE: serverkey.IS_ACTIVE
          };
        })
        .catch(err => { })
  }
  //tra key
  getPublickeyJson(req, res, next) {
    if (PUBLIC_KEY) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(PUBLIC_KEY));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'No PUBLIC_KEY init on server!'}));
    }
  }

  //check token if ok go next(), else throw error
  /**
   * Co 3 phuong phap lay token
   * 1. Lay tu header authorization
   * 2. lay tu token trong url param (su dung get image)
   * 3. lay tu token trong json post gan truc tiep req.token
   * return req.user
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  tokenCheck(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) token = url.parse(req.url, true, false).query.token;
    req.token = req.token?req.token:token; // uu tien token truyen trong json gan truoc do
    if (tokenVerify(req)) {
      next();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'Auth token is not supplied or you are unauthorized!'}));
    }
  }

  //lay form chuyen thanh req.formData
  /**
   * return req.formData
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  formProcess(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let formData = {};
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403, message:'Parse Formdata Error', error: err}));
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
        req.formData = formData;
        next();
      }
    });
  }


  /**
   * Lay json chuyen thanh req.jsonData
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  jsonProcess(req, res, next){

    let postDataString = '';
    req.on('data', (chunk) => {
        postDataString += chunk;
    });
    req.on('end', () => {
      var postDataObject;
      try{
        
        console.log('postDataString',postDataString);

        postDataObject = JSON.parse(postDataString);
        req.jsonData = postDataObject;

        next();
      }catch(err){
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403,message:"No JSON parse Data",error:err}));
      }
    })
  }

  //dang ky user
  register(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      let isOKAll = true;
      let username = '';
      let password = '';

      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403, message:'Parse Formdata Error', error: err}));
      } else {
        for (let key in fields) {
          if (key = 'username') username = fields[key];
          if (key = 'password') password = fields[key];
        }
      }
      let decryptedPassSign = '';
      if (username && password) {
        username = username.toUpperCase();
        try {
          decryptedPassSign = MidlewareRSA.decrypt(password, 'utf8');
          decryptedPassSign = MidlewareRSA.sign(JSON.stringify({
            username: username,
            password: decryptedPassSign //clear password
          }), 'base64');
        } catch (err) {
          isOKAll = false;
        }
      } else {
        isOKAll = false;
      }
      //goi database ghi nhan user
      var userInfo = {
        username: username
        , password: decryptedPassSign
        , ip: req.clientIp ? req.clientIp : req.ip
      }

      if (isOKAll) {
        db.handler.createUser(userInfo)
          .then(data => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
              success: true,
              message: 'Đã đăng ký thành công!',
              username: username,
              certificate: decryptedPassSign
            }));
          })
          .catch(err => {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify({code:403, message:'Đăng ký không thành công đâu nhé!', error: err}));
          });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403, message:'Lỗi truyền số liệu không đúng'}));
      }
    });

  }

  //login user
  login(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

      let isOKAll = true;
      let username = '';
      let password = '';
      if (err) {
        next();
      } else {
        for (let key in fields) {
          if (key = 'username') username = fields[key];
          if (key = 'password') password = fields[key];
        }
      }
      let decryptedPassSign = '';
      if (username && password) {
        username = username.toUpperCase();
        try {
          decryptedPassSign = MidlewareRSA.decrypt(password, 'utf8');
          decryptedPassSign = MidlewareRSA.sign(JSON.stringify({
            username: username,
            password: decryptedPassSign
          }), 'base64');
        } catch (err) {
          isOKAll = false;
        }
      } else {
        isOKAll = false;
      }

      var userCheck = {
        username: username
        , password: decryptedPassSign
        , ip: req.clientIp ? req.clientIp : req.ip
      }
      if (isOKAll) {
        db.handler.checkUser(userCheck)
          .then(userInfo => {
            if (userInfo) {
              //thuc hien cac noi dung jwt
              req.user = userInfo;
              //console.log(req.user);
              let tokenLogin = tokenSign(req);
              //console.log(tokenLogin);
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({
                success: true,
                message: 'Chúc mừng bạn đã login thành công! Hãy sử dụng thẻ truy cập để yêu cầu dữ liệu của chúng tôi trong 24h tới!',
                token: tokenLogin
              }));
            }
          })
          .catch(err => {
            console.log('Login không thành công-do lỗi query: ' + err);
            res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify(err));
          });

      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403, message:'Lỗi truyền số liệu không đúng'}));
      }
    })
  }

  getUserInfo(req, res, next) {
    db.handler.getUserInfo(req, res, next);
  }

  logout(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      message: 'Logout successfull!'
    }));
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  authorize(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      message: 'Your token were authorized!'
    }));
  }

  
  //va sau khi process form data --> req, thi buoc nay chi goi update database thoi
  /**
   * return req.userSave and save to db
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  edit(req, res, next) {
    let userSave = req.formData;
    userSave.URL_IMAGE = userSave.file2Upload0?userSave.file2Upload0:'';
    req.userSave = userSave;
    db.handler.saveUserInfo(req, res, next);
  }

  /**
   * return user.URL_IMAGE by link url
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getAvatar(req, res, next) {

    let path = decodeURIComponent(url.parse(req.url, true, false).pathname);
    let filename = path.substring('/get-avatar/'.length);
    let fileRead = filename.replace('/',systempath.sep);

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
  }

  editAvatar(req, res, next) {
    throw JSON.stringify({
      success: true,
      message: 'Edit Avatar successfull!'
    })
  }


  editBackground(req, res, next) {
    throw JSON.stringify({
      success: true,
      message: 'Edit Bacground successfull!'
    })
  }


  /**
   * Lay req.jsonData lam du lieu dau vao de nhan tin
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  sendSMS(req, res, next){
    if (req.jsonData&&req.jsonData.isdn&&req.jsonData.sms){
      db.handler.sendSMS(req)
      .then(data=>{
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify(data));
      })
      .catch(err=>{
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({code:403, message:'Oracle Error', error: err}));
      })
      ;
    }else{
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'No jsonData for Send SMS!'}));
    }
  }

  /**
   * khoi tao key random
   * sign
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  requestIsdn(req,res,next){
    if (req.jsonData&&req.jsonData.isdn){
        let keyOTP =  Math.random().toString(36).substring(2,8).toUpperCase();
        req.jsonData.key = keyOTP;
        req.jsonData.sms = 'Mat khau OTP cua ban la: ' + keyOTP
        db.handler.sendSMS(req)
        .then(data=>{
          data.token = tokenSign(req);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(JSON.stringify(data));
        })
        .catch(err=>{
          res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(JSON.stringify({code:403, message:'Oracle Error', error: err}));
        });
    }else{
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'No jsonData for Request ISDN!'}));
    }
  }

  confirmKey(req,res,next){
    if (req.jsonData&&req.jsonData.key&&req.jsonData.token){
        console.log(req.jsonData);
        req.keyOTP = req.jsonData.key; //user nhap vao khi nhan duoc sms
        req.token = req.jsonData.token; //phien truoc da gui va luu lai
        
        if (tokenVerify(req)) { //sau khi 
          
          console.log(req.user); //sau khi verify no decode thanh user chua isdn

          let tokenConfirmed = tokenSign(req); //ghi nhan token moi 24h

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(JSON.stringify({
            token:tokenConfirmed,
            status:1,
            message:'You are verified!'
          }))

        }else{
          res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(JSON.stringify({code:403, message:'your key/token invalid!'}));
        }
        
      
    }else{
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'No jsonData for confirm!'}));
    }
  }


}

module.exports = {
  AuthHandler: new AuthHandler()
};