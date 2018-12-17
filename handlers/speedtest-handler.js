const request = require('request');

//lay toa do cua client
function getIsp(ip) {
    return new Promise((resolve, reject) => {
        request('https://ipinfo.io/' + ip + '/json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var client = JSON.parse(body);

                if (client) {
                    //console.log('Get Distance...') // Print the google web page.
                    getServerDistance(client)
                        .then(server => {
                            //console.log('server distance: ') // Print the google web page.
                            //console.log(server) // Print the google web page.
                            resolve({
                                client: client,
                                server: server,
                                distance: server.distance ? server.distance : null
                            });
                        })
                        .catch(err => reject(err));
                } else {
                    reject('No client found!');
                }
            } else {
                reject(error);
            }
        });
    });
}

//lay toa do, cua may chu 
function getServerDistance(client) {
    return new Promise((resolve, reject) => {
        request('https://ipinfo.io/json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var server = JSON.parse(body);
                //console.log('server') // Print the google web page.
                //console.log(server) // Print the google web page.
                if (client && client.loc && client.loc[0] && client.loc[1] &&
                    server && server.loc && server.loc[0] && server.loc[1]) {
                    //khoang cach tu client den server
                    server.distance = getDistance(
                        server.loc[0]
                        , server.loc[1]
                        , client.loc[0]
                        , client.loc[1]);

                    //console.log(server.distance) // Print the google web page.

                    resolve(server);
                } else {
                    resolve(server);
                }
            } else {
                reject(error);
            }
        });
    });
}

function getDistance(lat1, lon1, lat2, lon2) {
    let rad = Math.PI / 180;
    let deltaLon = lon1 - lon2;
    distance = Math.sin(lat1 * rad) * Math.sin(lat2 * rad)
        + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.cos(deltaLon * rad);
    return Math.acos(distance) / rad * 60 * 1.853;
}


class SpeedtestHandler {

    empty(req, res, next) {
        res.writeHead(200, {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Cache-Control': 'post-check=0, pre-check=0', //append
            'Pragma': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.end('...');
    }
    emptyPost(req, res, next) {
        req.on('data', (chunk) => {
            //postany += chunk;
        });
        //
        req.on('end', () => {
            //do nothing
        });
        res.writeHead(200, {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Cache-Control': 'post-check=0, pre-check=0', //append
            'Pragma': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.end();
    }


    getIp(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        var ip;
        if (req.headers["client_ip"]) {
            ip = req.headers["client_ip"];
        } else if (req.headers["x-real-ip"]) {
            ip = req.headers["x-real-ip"];
        } else if (req.headers["x-forwarded-for"]) {
            ip = req.headers["x-forwarded-for"];
        } else if (req.headers["remote_add"]) {
            ip = req.headers["remote_add"];
        } else {
            ip = req.ip;
        }

        ip = ip.replace(/f+/, '').replace(/:+/, '');

        if (ip.indexOf('::1') >= 0) {
            res.end(JSON.stringify({
                status: false,
                message: "localhost ipv6 access"
            }));
        } else if (ip.indexOf('127.0.0') >= 0) {
            res.end(JSON.stringify({
                status: false,
                message: "localhost ipv4 access"
            }));
        }

        //lay thong tin cua dia chi ip
        getIsp(ip)
            .then(client_sever => {
                //console.log('client_sever:');
                //console.log(client_sever);
                res.end(JSON.stringify({
                    processedString: (client_sever.client && client_sever.client.org) ?
                        client_sever.client.ip
                        + ' - '
                        + client_sever.client.org
                        + ', '
                        + client_sever.client.country
                        : ip + ' - Unknow ISP',
                    rawIspInfo: client_sever.client,
                    server: client_sever.server
                }));
            })
            .catch(err => {
                console.log(err);
                res.end(JSON.stringify({
                    status: false,
                    message: "Error to get ISP ip!",
                    err: err
                }));
            });

    }

    download(req, res, next) {
        //lay dia chi ip va tra ve vi tri ip o dau 
        res.writeHead(200, {
            'Content-Description': 'File Transfer',
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=random.dat',
            'Content-Transfer-Encoding': 'binary',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Cache-Control': 'post-check=0, pre-check=0', //no replace
            'Pragma': 'no-cache'
        });
        var buff = Buffer.alloc(1048576, 'x');
        //tra theo block cho user
        var chunks = 1000;
        //bien chunk duoc nhan tu client yeu cau nhan so luong goi tin
        //ckSize min = 4, max = 100

        if (!chunks) chunks = 4;
        if (chunks > 100) chunks = 100;
        for (let i = 0; i < chunks; i++) {
            res.write(buff);
        }
        res.end();
    }
}

module.exports = {
    SpeedtestHandler: new SpeedtestHandler()
};