"use strict"
/**
 * Su dung doi tuong nay de
 * ket noi connection pool oracle
 * cho phep chay cac lenh:
 * createTable, createTableNotExists, 
 * insert,update,delete,
 * select, getRst, getRsts, getAllRsts
 * runSql --> thuc hien khong tra ket qua
 * executeFunction???, refCursor??
 */
const dbconfig = require("./oracle-config");
const oracledb = require('oracledb');
oracledb.autoCommit = dbconfig.autoCommit;
const isSilence = dbconfig.keep_silence;

const connectionPool = () => {
  return new Promise((resolve, reject) => {
    oracledb.createPool({
      poolAlias: dbconfig.poolAlias,
      user: dbconfig.user,
      password: dbconfig.password,
      connectString: dbconfig.connectString,
      poolMax: dbconfig.poolMax,
      poolMin: dbconfig.poolMin,
      poolIncrement: dbconfig.poolIncrement,
      poolTimeout: dbconfig.poolTimeout
    }, (err, pool) => {
      if (err) {
        console.log('Lỗi tạo pool:');
        reject(err);
      } else {
        pool.getConnection((err, connection) => {
          if (err) {
            console.log('Lỗi get Connection qua pool:');
            console.log(err);
            reject(err);
          } else {
            console.log('Có kết nối qua Pool:');
            resolve(connection);
          }
        });
      }
    }
    );
  })
};



class OracleDAO {
  constructor() {
    connectionPool().then(connection => {
      console.log('Connected to database:' + dbconfig.connectString);
      //console.log(connection);
      this.conn = connection;
      //console.log(this.conn);
      //tu day dung conn de ket noi nhu pool
    })
      .catch(err => {
        console.log('Connect to database fail:', err);
      });
  }

  createTable(tableJson) {
    //neu kiem tra table da co thi khong can tao nua
    return this.getRst("select count(1) count_table from user_tables where table_name = '" + tableJson.name + "'")
      .then(data => {
        /**
        * { metaData: [ { name: 'COUNT_TABLE' }, { name: 'MY_VAR' } ],
            rows: [ { COUNT_TABLE: 1, MY_VAR: 1000 } ] } //=giong sqlite 
        */
        //console.log(data.COUNT_TABLE);
        if (data.COUNT_TABLE
          && data.COUNT_TABLE == 1) {
          return new Promise((resolve, reject) => {
            resolve({ status: true, message: "Create Table: " + tableJson.name + " exists!" });
          });
        } else {
          return this.createTableNotExists(tableJson);
        }
      })
      .catch(err=>{
        console.log('Lỗi tạo table:');
        console.log(err);
      });
  }

  /**
   * 
   * @param {*} table 
   * var table ={
   *              name: 'LOGIN',
   *              cols: [
   *                      {
   *                        name: 'ID',
   *                        type: dataType.number,
   *                        option_key: '',
   *                        description: 'Key duy nhat quan ly'
   *                        }
   *                      ]
   *            }
   */
  createTableNotExists(table) {
    let sql = 'CREATE TABLE ' + table.name + ' (';
    let i = 0;
    for (var col of table.cols) {
      if (i++ == 0) {
        sql += col.name + ' ' + col.type + ' ' + col.option_key;
      } else {
        sql += ', ' + col.name + ' ' + col.type + ' ' + col.option_key;
      }
    }
    sql += ')';
    return this.runSql(sql);
  }


  //insert
  /**
   * 
   * @param {*} insertTable 
   * var insertTable={
   *                  name:'tablename',
   *                  cols:[{
   *                        name:'ID',
   *                        value:'1'
   *                        }]
   *                  }
   * 
   */
  insert(insertTable) {
    let sql = 'INSERT INTO ' + insertTable.name
      + ' ('
    let i = 0;
    let sqlNames = '';
    let sqlValues = '';
    let params = [];
    for (let col of insertTable.cols) {
      if (col.value) {
        params.push(col.value);
        if (i == 0) {
          sqlNames += col.name;
          sqlValues += ':' + i; //kieu index insert trong nodejs oracledb xem index-sample.js bat dau tu 0
        } else {
          sqlNames += ', ' + col.name;
          sqlValues += ', :' + i;
        }
        i++;
      }
    }

    sql += sqlNames + ') VALUES (';
    sql += sqlValues + ')';

    return this.runSql(sql, params);
  }

  //update 
  /**
   * 
   * @param {*} updateTable
   *  var updateTable={
   *                  name:'tablename',
   *                  cols:[{
   *                        name:'ID',
   *                        value:'1'
   *                        }]
   *                  wheres:[{
   *                         name:'ID',
   *                         value:'1'
   *                         }]
   *                  }
   */
  update(updateTable) {
    let sql = 'UPDATE ' + updateTable.name + ' SET ';

    let i = 0;
    let params = [];
    for (let col of updateTable.cols) {
      if (col.value) {
        //neu gia tri khong phai undefined moi duoc thuc thi
        params.push(col.value);
        if (i == 0) {
          sql += col.name + '= :' + i;
        } else {
          sql += ', ' + col.name + '= :' + i;
        }
        i++;
      }
    }

    i = 0;
    for (let col of updateTable.wheres) {
      if (col.value) {
        params.push(col.value);
        if (i == 0) {
          sql += ' WHERE ' + col.name + '= :' + i;
        } else {
          sql += ' AND ' + col.name + '= :' + i;
        }
        i++;
      } else {
        sql += ' WHERE 1=2'; //menh de where sai thi khong cho update Bao toan du lieu
      }
    }
    return this.runSql(sql, params)
  }

  //delete
  /**
   * Ham xoa bang ghi
   * @param {*} id 
   */
  delete(deleteTable) {
    let sql = 'DELETE FROM ' + deleteTable.name;
    let i = 0;
    let params = [];
    for (let col of deleteTable.wheres) {
      if (col.value) {
        params.push(col.value);
        if (i == 0) {
          sql += ' WHERE ' + col.name + '= :' + i;
        } else {
          sql += ' AND ' + col.name + '= :' + i;
        }
        i++; //tang i len 1 
      } else {
        sql += ' WHERE 1=2'; //dam bao khong bi xoa toan bo so lieu khi khai bao sai
      }
    }
    return this.runSql(sql, params)
  }

  //
  /**
   * lenh select, update, delete su dung keu json 
   * viet tuong tu sqlite de su dung qua lai
   * @param {*} selectTable 
   */
  select(selectTable) {
    let sql = '';
    let i = 0;
    let params = [];
    let sqlNames = '';
    for (let col of selectTable.cols) {
      if (i++ == 0) {
        sqlNames += col.name;
      } else {
        sqlNames += ', ' + col.name;
      }
    }
    sql = 'SELECT ' + sqlNames + ' FROM ' + selectTable.name;
    i = 0;
    for (let col of selectTable.wheres) {
      if (col.value) {
        params.push(col.value);
        if (i == 0) {
          sql += ' WHERE ' + col.name + '= :' + i;
        } else {
          sql += ' AND ' + col.name + '= :' + i;
        }
        i++;
      }
    }
    //console.log(sql);
    //console.log(params);
    return this.getRst(sql, params)
  }
  //lay 1 bang ghi dau tien cua select
  /**
   * lay 1 bang ghi
   * @param {*} sql 
   * @param {*} params 
   */
  getRst(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.execute(
        sql
        , params
        , {
          outFormat: oracledb.OBJECT //[ { NAME: 'Steven King', EMAIL: 'SKING' } ]
        }, //kieu doi tuong tra ve khong default
        (err, result) => {
          if (err) {
            if (!isSilence) console.log('Could NOT excute: ' + sql)
            reject(err)
          }
          //console.log('ket qua: ',result);
          if (result
            && result.rows
            && result.rows[0]
          ) {
            resolve(result.rows[0])   //trả về là một json kết quả select nhu cua sqlite
          } else {
            resolve(); //dua ve khong co bien nao, goi la undifined
          }
        });
    })
  }

  /**
   * Lay tat ca cac bang ghi 
   * @param {*} selectTable 
   */
  selectAll(selectTable) {
    let sql = '';
    let i = 0;
    let params = [];
    let sqlNames = '';
    for (let col of selectTable.cols) {
      if (i++ == 0) {
        sqlNames += col.name;
      } else {
        sqlNames += ', ' + col.name;
      }
    }
    sql = 'SELECT ' + sqlNames + ' FROM ' + selectTable.name;
    i = 0;
    for (let col of selectTable.wheres) {
      if (col.value) {
        params.push(col.value);
        if (i == 0) {
          sql += ' WHERE ' + col.name + '= :' + i;
        } else {
          sql += ' AND ' + col.name + '= :' + i;
        }
        i++;
      }
    }
    return this.getAllRsts(sql, params)
  }
  /**
   * Lay tat ca cac bang ghi
   * @param {*} sql 
   * @param {*} params 
   */
  getRsts(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.execute(
        sql
        , params
        , {
          outFormat: oracledb.OBJECT //[ { NAME: 'Steven King', EMAIL: 'SKING' } ]
        }, //option lay ket qua la gi
        (err, results) => {
          if (err) {
            if (!isSilence) console.log('Could NOT excute: ' + sql)
            reject(err)
          }else{
            //lay ve theo kieu sqlite //khong theo kieu oracle
            if (result
              && result.rows
            ) {
              resolve(result.rows)   //trả về là một json kết quả select nhu cua sqlite
            } else {
              resolve(); //dua ve khong co bien nao, goi la undifined
            }
          }
        });
    })
  }

  /**
   * Lay tat ca cac bang ghi
   * @param {*} sql 
   * @param {*} params 
   */
  getAllRsts(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.execute(
        sql
        , params
        , {}, //option lay ket qua la gi
        (err, results) => {
          if (err) {
            if (!isSilence) console.log('Could NOT excute: ' + sql)
            reject(err)
          }else{
            resolve(results)   //tra ve kieu json default cho oracle khong co colum nname
          }
        });
    })
  }
  /**
   * Ham thuc thi lenh sql insert, update, delete, call procedure no output get
   * 
   * @param {*} sql 
   * @param {*} params 
   */
  runSql(sql, params = []) {  //Hàm do ta tự đặt tên gồm 2 tham số truyền vào.
    return new Promise((resolve, reject) => {   //Tạo mới một Promise thực thi câu lệnh sql
      this.conn.execute(
        sql
        , params
        , {}, //option lay ket qua la gi
        (err, result) => {
          if (err) {
            if (!isSilence) console.log('Could NOT excute: ' + sql);
            reject(err);
          }
          if (!isSilence) console.log(result);
          resolve('Executed: ' + sql)   //Trả về kết quả là một câu lệnh. 
          //Trường hợp createTable sẽ undified result
        });
    })
  }


  /**
   * gia lap goi ham nhu cua java
   * dua vao ten ham, so luong bien, tra ve ket qua
   * @param {*} oracleFunctionName 
   * @param {*} params 
   */
  executeJavaFunction(oracleFunctionName,params=[]){
    //ham tra ve ket qua la mot json gia tri
    var bindVars = {};
    bindVars.v_out =  { type: oracledb.STRING, dir: oracledb.BIND_OUT };
    var bound_params ='';
    let i=0;
    for (let p of params) {
      var p_in = 'p_in_'+i;
      if (i++==0){
        bound_params+= ':' + p_in
      }else{
        bound_params+= ', :' + p_in
      }

      Object.defineProperty(bindVars, p_in, {
        value: p, //gia tri bien duoc bind vao bindVars.p_in_0,1,...n
        writable: false, //khong cho phep sua du lieu sau khi gan gia tri vao
        enumerable: true, //cho phep gan thanh thuoc tinh truy van sau khi hoan thanh
        //configurable: false default
      });
    }
    return this.executeFunction(
      "BEGIN :v_out := "+oracleFunctionName+"("+ bound_params +"); END;"
      ,bindVars
      );
  }

  /**
   * var bindVars = {
        i:  1, // default direction is BIND_IN. bien IN
        io: { val: '1', dir: oracledb.BIND_INOUT }, //bien inout
        o:  { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } //bien out
      }

      conn.execute(
        "BEGIN :o := taxi_owner.pkg_user.test(:i); END;" //cach 1 goi theo bien = sqlFunction
        ,bindVars //Cach truyen bien vao theo Object json
        , { },
         (err, result) =>{
        if (err) {
            console.log("ERROR: Unable to execute the SQL: ", err);
        }
            console.log(result.outBinds);
      });

   */
  executeFunction(sqlFunction,bindVars){
    return new Promise((resolve, reject) => {   //Tạo mới một Promise thực thi câu lệnh sql
      this.conn.execute(
        sqlFunction
        , bindVars
        , {}, //option lay ket qua la gi
        (err, result) => {
          if (err) {
            if (!isSilence) console.log('Could NOT excute: ' + sqlFunction);
            reject(err);
          }
          if (!isSilence) console.log(result);
          if (result&&result.outBinds){
            resolve(result.outBinds)  //Trả về một mảng kết quả giá trị của biến output 
          }else{
            resolve(result)  //Trả về doi tuong ket qua luon
          }
        });
    })
  }
}

module.exports = OracleDAO; 