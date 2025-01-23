const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
let connection;
const ConnectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
  }
  return connection;
};
module.exports = ConnectToDatabase;
