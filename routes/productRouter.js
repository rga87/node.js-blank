
const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const {param,check} = require("express-validator");

//--------------------------------------------------------------------------------
router.post("/create", productController.create);
//--------------------------------------------------------------------------------
router.get("/", productController.getProducts);
//--------------------------------------------------------------------------------
router.get("/:productId",[
    param("productId","не верно указан productId").isInt({ min: 1}).toInt()
],
productController.getProduct);
//--------------------------------------------------------------------------------
router.put("/:productId",[
    check("name","Имя пользователя не может быть пустым").notEmpty(),
    check("productId","не верно указан productId").isInt({ min: 1}).toInt()
], 
productController.updateProduct);
//--------------------------------------------------------------------------------
router.delete("/:productId",[
    check("productId","не верно указан productId").isInt({ min: 1}).toInt()
], 
productController.deleteProduct);
//--------------------------------------------------------------------------------
module.exports = router;