
const oracleService = require('./db/oracle/oracle-jwt-service');


//const sqliteService = require('./db/sqlite3/sqlite-jwt-service');

//khoi tao bang database theo tung csdl khac nhau
//vi du - tao bang sql:
//sqliteService.HandleDatabase.init(); //tao bang

setTimeout(()=>{
    //da 1 giay troi qua, thuc thi lenh khoi tao
    oracleService.HandleDatabase.init(); //tao bang JWT cho oracle
    /**
     * SERVER_KEYS
     * LOCAL_USERS
     * SOCIAL_USERS
     * LOG_ACCESS
     * LOG_ACCESS_DETAILS
     * 
     * 
     */
    
    //lay kieu oracledb.OBJECT -- cac COLUMN_NAME deu chuyen sang chu UPPERCASE()
    /**
     * { metaData: [ { name: 'COUNT_TABLE' }, { name: 'MY_VAR' } ],
        rows: [ { COUNT_TABLE: 1, MY_VAR: 1000 } ] } //=giong sqlite 
     */
    /* oracleService.db.getRst("select count(1) count_table, 1000 my_var from user_tables where table_name = 'LOCAL_USERS'")
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    }); */

    //cau lenh doi xu ly be hom
    /**
     * { metaData: [ { name: 'COUNT_TABLE' }, { name: 'MY_VAR' } ],
        rows: [ [ 1, 100 ] ] } //ket qua array in array giam thieu column_name //#khac sqlite
     */
 /*    oracleService.db.getRsts("select count(1) count_table, 100 my_var from user_tables where table_name = 'LOCAL_USERS'")
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    }); */

    oracleService.db.executeJavaFunction('taxi_owner.pkg_user.test',[1])
    .then(data=>{
        console.log('Ket qua thuc hien ham tren tra ve du lieu:');
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })


},1000);
