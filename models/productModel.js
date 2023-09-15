const connection= require('./connection_mysql');

module.exports = {
    //---------------------------------------------------------------------------------------------------
    getProduct(productId){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Products WHERE Products.ID=?',[productId],(error, results) => {
                if (error) {
                   reject(error);
                }
                (results.length>0)?resolve(results):resolve(-1);
              }
            );
        });
    },
    //---------------------------------------------------------------------------------------------------
    updateProduct(productId,name){
        return new Promise((resolve, reject) => {
            connection.query(' UPDATE Products SET Name=? WHERE Products.ID=?',[name,productId],(error, results) => {
                if (error) {
                   reject(error);
                }
                resolve(results);
              }
            );
        });
    },
    //---------------------------------------------------------------------------------------------------
    getProducts(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Products',(error, results) => {
                if (error) {
                   reject(error);
                }
                resolve(results);
              }
            );
        });
    },
    //---------------------------------------------------------------------------------------------------
    deleteProduct(){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Products WHERE Products.ID=?',(error, results) => {
                if (error) {
                  return reject(error);
                }
                resolve(results);
              }
            );
        });
    }
    //---------------------------------------------------------------------------------------------------
};