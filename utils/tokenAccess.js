const jwt = require('jsonwebtoken');
const SECRET_KEY="kalva735Do";

class Token_Access { 
    static getToken(name){
        try{
            return jwt.sign(name,SECRET_KEY,{expiresIn:'604800'});
        }catch(error){
             return 'error';
        }
    }
    static verifyToken(token){
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(token,SECRET_KEY,function(err,result){
                    err?resolve(false):resolve(true);
                });
            });
        }catch(error){
            return false;
        }
    }
}
module.exports = Token_Access