const mysql = require("mysql2");
const { DB } = require("../constant/env.constant");
const config_db_connection = {
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
};
module.exports = {
  connection: mysql.createConnection(config_db_connection),
};
