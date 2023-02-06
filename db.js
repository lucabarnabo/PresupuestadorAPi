const mysql = require("mysql");

const pool = mysql.createPool({
  hots: process.env.DB_HOST,
  user: "root",
  password: "root",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
console.log(pool);
module.exports = { pool: this.pool };
