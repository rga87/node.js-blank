
const express = require("express");
const {check,header} = require("express-validator");
///////////////////////////////////////////////////////////////////////////////
const securityController = require("../controllers/securityController");
const router = express.Router();
//---------------------------------------------------------------------------------------------------
router.use("/",[
    header("token","Пожалуйста, отправьте токен").notEmpty()
], securityController.check);
//---------------------------------------------------------------------------------------------------
router.post("/authenticate",
[
    check("name","Наименование пользователя не может быть пустым").notEmpty(), 
    check("password","Пароль пользователя не может быть пустым").notEmpty()
],
securityController.authenticate);
//---------------------------------------------------------------------------------------------------
module.exports = router;
