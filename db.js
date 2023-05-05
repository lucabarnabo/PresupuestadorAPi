const mysql = require("mysql");

const db = mysql.createPool({
  hots: process.env.DB_HOST,
  user: "root",
  password: "root",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = db;
