const DDDoS = require('dddos');
module.exports = new DDDoS({
                        errorData: "Hãy bình tĩnh, đợi tý đi!",
                        //Data to be passes to the client on DDoS detection. Default: "Not so fast!".
                        errorCode: 429,
                        //HTTP error code to be set on DDoS detection. Default: 429 (Too Many Requests)
                        weight: 1,
                        maxWeight: 5,
                        checkInterval: 1000,
                        rules: [
                        /* { //cho phep trang api chi cho phep 1 giay 1 yeu cau thoi
                            string: '/api/ext-auth/alive-session',
                            maxWeight: 1
                        } */
                        { // Allow 1 requests accessing the application API per checkInterval 
                            regexp: "^/api/ext-auth/*",
                            flags: "i",
                            maxWeight: 1,
                            queueSize: 1 // If request limit is exceeded, new requests are added to the queue 
                        },
                        ]
                    })
;
  