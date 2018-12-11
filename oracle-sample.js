const dbconfig = require("./db/oracle/config");  
const oracledb = require('oracledb');
//thuc thi lenh bang chuong trinh se tu dong commit luon nhe
oracledb.autoCommit = true;

//co the ket noi nhieu database voi nhieu pool sau

var taxiDBCuongdqPool = oracledb.createPool({
                                poolAlias:        dbconfig.poolAlias,
                                user:             dbconfig.user,
                                password:         dbconfig.password,
                                connectString:    dbconfig.connectString,
                                poolMax:          dbconfig.poolMax,
                                poolMin:          dbconfig.poolMin,
                                poolIncrement:    dbconfig.poolIncrement,
                                poolTimeout:      dbconfig.poolTimeout
                            }/* , (err, pool) => {
                                if (err){
                                    console.log('err createPool:');
                                    console.log(err);
                                    return err;
                                }else{
                                    pool.getConnection ((err, connection) =>{
                                        if (err){
                                            console.log('err getConnection:');
                                            console.log(err);
                                            return err;
                                        }else{
                                            console.log('err connection:');
                                            console.log(connection);
                                            //doi tuong connection su dung ket noi database
                                            return connection;
                                        }
                                    });
                                }
                            } */
                            );


/**
 * Su dung nhieu connect den nhieu database thi 
 * khai bao nhieu pool, va lay ve cac connection la mot mang
 */
var taxiDBConnection;
var errAll = false;
var isPromiseEnd = false;

var poolConnections = Promise.all([taxiDBCuongdqPool]);
                
           
//thuc thi goi lenh 
poolConnections.then((pools) => {
    //tat ca cac tien trinh trong mang promise deu phai ket thuc
    //thi no se nhay vao day
    //console.log(pools[0].poolAlias); // 'cuongdqPool'
    //console.log(pools[1].poolAlias); // 'otherPool' // -->database khac
   pools[0].getConnection ((err, connection) =>{
        if (err){
            console.log('err getConnection:');
            console.log(err);
            throw {point:'getConnection', //loi tu day
                err:err}; //tra ve cho catch err sau
        }else{
            taxiDBConnection = connection;
            console.log('Wellcome to Pool connected: ' + pools[0].poolAlias);
            //ket tu day ta co the su dung duoc connection nay
            //ket thuc 1
            isPromiseEnd = true; //bay gio no da xong

            /* autoCommit: false, outFormat: oracledb.OBJECT, maxRows:1000 */
            /* taxiDBConnection.execute(
                "select * from admin_user where user_id = 1"
                ,[], { },
                 (err, result) =>{
                if (err) {
                    console.log("ERROR: Unable to execute the SQL: ", err);
                }
                    console.log(result);
              }); */
        }
    });
})
.catch((err) =>{
    //neu it nhat co 1 promise co reject thi no se nhay vao day
    console.log('err Create Pool: ');             
    console.log(err);     
    //return null;
    //ket thuc 2
    errAll = true; //loi da xong
});


var timeout = false;
//while (!isPromiseEnd&&!errAll&&!timeout){
    //tra dieu kien cho cpu di nhe

    //waiting for promise nhe
setTimeout(()=>{


     timeout = true; //qua thoi gian thi thoat vong lap
     console.log('Timeout!:'); //1 giay sau thi da co ket noi roi


// Thu nghiem cac lenh tu link cho Oracle nodejs:

//https://www.zybuluo.com/WrRan/note/570707



     /* //cach 1 ra ket qua
     taxiDBConnection.execute(
        "select user_name, last_name, first_name, email from admin_user where user_id = :p_user_id" //bien tham so 1
        ,{p_user_id: 1} //cach truyen tham so 1
        , { },
         (err, result) =>{
        if (err) {
            console.log("ERROR: Unable to execute the SQL: ", err);
        }
            console.log(result);
      });


      //cach truyen tham so 2:
      taxiDBConnection.execute(
        "select user_name, last_name, first_name, email from admin_user where user_id = :0" //bien tham so 1
        ,[3] //cach truyen tham so 2 la so thu tu bien ghi trong cau lenh tu 0,1,2... co the dao vi tri
             //phia praram co the dao vi tri -- vi du tren la select user_id = 2 
        , { },
         (err, result) =>{
        if (err) {
            console.log("ERROR: Unable to execute the SQL: ", err);
        }
            console.log(result);
      }); */

      //cach lay gia tri ra nhu goi ham vay nhe
      var bindVars = {
        i:  1, // default direction is BIND_IN. Datatype is inferred from the data
        //io: { val: '1', dir: oracledb.BIND_INOUT }, //truong hop goi function trong oracle
        o:  { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      }

      taxiDBConnection.execute(
        "BEGIN :o := taxi_owner.pkg_user.test(:i); END;" //cach 1 goi theo bien
        ,bindVars //Cach truyen bien vao theo Object json
        , { },
         (err, result) =>{
        if (err) {
            console.log("ERROR: Unable to execute the SQL: ", err);
        }
            console.log(result.outBinds);
      });


      //goi function lay ket qua nhe



},1000); //trong vong 10 giay thi doi ket qua no
//}

if (isPromiseEnd){
    console.log('Wellcome to new Connection:');
}
if (errAll){
    console.log('Connections error!');
}

//day la connection
console.log(taxiDBConnection);

//khoi dong len doi cho den khi errAll = true || 



//doi chay mot thoi gian se cho duoc taxiDBConnection
if (taxiDBConnection){
    //da ket noi thanh cong
    console.log(taxiDBConnection);
}else{
    //khong ket noi duoc database
    console.log('Khong ket noi duoc taxiDBConnection!');
}

function doRelease(connection) { //giai phong mot connection neu co ket noi
    connection.close(err=>{ if (err) console.error(JSON.stringify(err))});
  };

  //giai phong pool di khong dung nua neu thoat chuong trinh
  //doRelease();
