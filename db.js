const mysql = require("mysql");

const pool = mysql.createPool({
  hots: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = { pool: this.pool };
