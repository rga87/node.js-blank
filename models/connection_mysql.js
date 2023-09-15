const mysql = require("mysql2");
const dotenv = require('dotenv');
const path = require('path');
const ENV_FILE_MYSQL= path.join(__dirname,'..', '.env.mysql');
dotenv.config({path: ENV_FILE_MYSQL});

const connection = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD
});

module.exports = connection;