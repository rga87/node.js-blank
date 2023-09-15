const bcrypt = require('bcrypt');
const connection= require('./connection_mysql');
const tokenAccess = require('../utils/tokenAccess');
module.exports = {
    //--------------------------------------------------------------------------------------------------
    authenticate(name,password){
        try{
            return new Promise((resolve, reject) => {
               // if(validator.checkString(name,150)&&validator.checkString(password,150)){
                    connection.query('SELECT * FROM Users WHERE Name = ?',[name], function (error, results){
                    if (error){
                        console.log(error);
                        reject({'status':400,'message':'Произошла ошибка при запросе к БД'});
                    }else{
                        if(typeof results !=='undefined'){
                            if(results.length>0){
                                const hashedPassword=bcrypt.hashSync(password, results[0].Salt);
                                if(hashedPassword===results[0].Password){
                                    resolve({
                                        'status':200,
                                        'message':'Выполнено успешно',
                                        'token':tokenAccess.getToken(results[0].Name),
                                        'expiration':604800
                                    });
                                }else{
                                    resolve({'status':401,'message':"Не правильные имя или пароль"});
                                }
                            }else{
                                resolve({'status':401,'message':"Пользователя с таким именем не существует"});
                            }
                        }else{
                            resolve({'status':500,'message':'Произошла ошибка при обработке запроса'});
                        }
                    }
                    });
                //}else{
                //    resolve({'status':400,'message':'Сервер не понимает запрос из-за неверного синтаксиса'});
               // }
            });
        }catch(error){
            console.log(error);
            return {'status':500,'message':'Произошла ошибка при обработке запроса'};
        }
    },
    //--------------------------------------------------------------------------------------------------
};