const {validationResult} = require("express-validator")
////////////////////////////////////////////////////////////////////////////////////////
const tokenAccess = require('../utils/tokenAccess');
const userModel = require('../models/userModel');

exports.authenticate = async function (req, res){
    try{
      const {name,password} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
      }
      const resultAuthenticate=await userModel.authenticate(name,password);
      res.status(resultAuthenticate.status).json(resultAuthenticate);
    }catch(error){
      console.log(error);
      res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
    }
};
exports.check = async function(req, res, next){
    try {
      const token=req.headers.token;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(401).json({'status':401, errors: errors.array()});
      }
       if (req.path == "/authenticate"){
        next();
      }else{
        const resultCheckToken=await tokenAccess.verifyToken(token);
        resultCheckToken ? next():res.status(403).json({'status':403, 'message': 'Токен недействителен'})
      }
    }catch(error){
      console.log(error);
      res.status(400).json({'status':400,'message':'Сервер не понимает запрос из-за неверного синтаксиса'});
    } 
};