module.exports ={
    poolAlias:'cuongdqPool', //su dung de release neu khoi dong
    user:'taxi_owner',
    password:'taxi',
    //connectString:'10.151.59.92:1521/BUSINESS',
    connectString:"(DESCRIPTION=(LOAD_BALANCE=on)(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=10.151.59.91)(PORT=1521))(ADDRESS=(PROTOCOL=TCP)(HOST=10.151.59.92)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=BUSINESS)))",
    poolMax: 2,
    poolMin: 2,
    poolIncrement: 0,
    poolTimeout: 4,
    keep_silence:false,
    autoCommit:true,
    service_key:'web-mf3-gate'
}