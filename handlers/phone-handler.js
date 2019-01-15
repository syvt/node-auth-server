  const tokenHandler = require('../utils/token-handler');

  const db = require('../db/oracle/oracle-jwt-service');
        setTimeout(()=>{
            db.handler.init();
        },3000); //doi 3 giay de oracle ket noi

  /**
   * khoi tao key random
   * sign
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
var requestIsdn = (req,res,next)=>{
    
    //console.log('req.json_data',req.json_data); //da dich duoc json
    
    if (req.json_data&&req.json_data.phone){
        let keyOTP =  Math.random().toString(36).substring(2,8).toUpperCase();
        req.json_data.key = keyOTP;
        req.json_data.sms = 'Mat khau OTP cua ban la: ' + keyOTP
        //console.log('req.json_data new: ',req.json_data); //da dich duoc json
        db.handler.sendSMS(req)
        .then(data=>{
            data.token = tokenHandler.tokenSign(req);
            console.log('data.token',data); //xen log
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        })
        .catch(err=>{
          res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(JSON.stringify({code:403, message:'Oracle Error', error: err}));
        });
    }else{
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({code:403, message:'No json_data for Request phone!'}));
    }
  }

var confirmKey = (req,res,next)=>{
    //console.log('req.json_data',req.json_data); //da dich duoc json
    if (req.json_data&&req.json_data.key&&req.json_data.token){
        //console.log(req.json_data);
        req.keyOTP = req.json_data.key; //user nhap vao khi nhan duoc sms
        req.token = req.json_data.token; //phien truoc da gui va luu lai
        
        if (tokenHandler.tokenVerify(req)) { //sau khi 
          
          console.log('req.user', req.user); //sau khi verify no decode thanh user chua phone

          let tokenConfirmed = tokenHandler.tokenSign(req,'24h',true); //ghi nhan token moi 24h, xac thuc cho server tu xa

          res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            token:tokenConfirmed,
            status:1,
            message:'You are verified!'
          }))

        }else{
           res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
           res.end(JSON.stringify({code:403, message:'your key/token invalid!'}));
        }
        
      
    }else{
      res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });          
      res.end(JSON.stringify({code:403, message:'No json_data for confirm!'}));
    }
  }

var authorizeToken = (req,res,next)=>{
    
    console.log('req.json_data',req.json_data); //da dich duoc json

    if (req.json_data&&req.json_data.token){
        req.token = req.json_data.token;
        if (tokenHandler.tokenVerify(req)) { 
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                status:true,
                message:'You are verified!',
                user_info: req.user
              }))
        }else{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({code:403, message:'your key/token invalid!'}));
        }
    }else{
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });          
        res.end(JSON.stringify({code:403, message:'No json_data for confirm!'}));
    }


}

module.exports = {
    requestIsdn: requestIsdn,
    confirmKey: confirmKey,
    authorizeToken: authorizeToken,
};