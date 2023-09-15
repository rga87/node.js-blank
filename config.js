const mysql = require('mysql');
let mysqlConfig = {
    'host': process.env.mysql.MYSQL_URL,
    'user': process.env.mysql.MYSQL_USERNAME,
    'password' : process.env.mysql.MYSQL_ROOT_PASSWORD,
    'database': process.env.mysql.MYSQL_DATABASE
};
//-----------------------------------------------------------------------------------------
class Connection_Mysql{
    constructor(){
        this.attempt=1;
    }
    //-----------------------------------------------------------------------------------------
    initDB() {
        try{
            console.log("start check connection: attempt "+this.attempt);
            return new Promise(async(resolve, reject) => {
                let result=false;
                while(result==false){
                    result= await this.start_connection();
                    console.log("checking connection.....");
                    this.attempt=this.attempt++;
                    if(result==false){
                        require('deasync').sleep(3000);
                    }else{
                        console.log("finish check connection");
                        resolve(result);
                    }
                }
            });
        }catch(error){
            console.log(error);
            return false;
        }
    }
    //-----------------------------------------------------------------------------------------
    start_connection(){
        try{
            return new Promise((resolve, reject) => {
                this.connection = mysql.createPool(mysqlConfig);
                this.connection.getConnection(async function(err,connection){
                    if (err) {
                        err.sqlMessage?console.log(err.sqlMessage):console.log(err);
                        resolve(false);
                    }else{
                        resolve(connection);
                    }
                });
            }) ; 
        }catch(error){
            console.log(error);
            return false;    
        }
    }
    //-----------------------------------------------------------------------------------------
    getConnection(){
        return this.connection;
    }
}
module.exports = Connection_Mysql; 
