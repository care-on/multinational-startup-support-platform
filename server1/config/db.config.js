const mysql = require("mysql2");
const { DB } = require("../constant/env.constant");
const config_db_connection = {
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
};
const config_db_connection_pool = {
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
module.exports = {
  connection: mysql.createConnection(config_db_connection),
  connection_pool: mysql.createPool(config_db_connection_pool).promise(),
};
