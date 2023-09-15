const {validationResult} = require("express-validator")
//--------------------------------------------------------------------------------
const productModel = require("../models/productModel");
//--------------------------------------------------------------------------------
const _handleError = (res,error) => {
  res.status(500).send(error);
}
//--------------------------------------------------------------------------------
exports.create = function (req, res){
  try{
    res.status(200).json({'data':'create product'});
  }catch(error){
    console.log(error);
    res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
  }
};
//--------------------------------------------------------------------------------
exports.getProducts = async function (req, res){
  productModel
    .getProducts()
    .then((result)=>res.status(200).json(result))
    .catch((error)=>_handleError(res,error))
};
//--------------------------------------------------------------------------------
exports.getProduct = async function (req, res){
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const { productId } = req.params;
    const resultGetProduct=await productModel.getProduct(productId);
    (resultGetProduct !==-1)?res.status(200).json({'status':200,'product':resultGetProduct}):res.status(404).json({'status':404,'product':-1,'message':'не найден продукт с таким productId'})
  }catch(error){
    console.log(error);
    res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
  }
};
//--------------------------------------------------------------------------------
exports.updateProduct = async function (req, res){
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const { productId,name } = req.body;
      const result=await productModel.updateProduct(productId,name);
      res.status(200).json({'status':200,'result':result});
    }catch(error){
      console.log(error);
      res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
    }
};
//--------------------------------------------------------------------------------
exports.deleteProduct = async function (req, res){
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const { productId } = req.body;
      const result=await productModel.deleteProduct(productId);
      res.status(200).json({'status':200,'result':result});
    }catch(error){
      console.log(error);
      res.status(500).json({'status':500,'message':'Произошла ошибка при обработке запроса'});
    }
};
//--------------------------------------------------------------------------------