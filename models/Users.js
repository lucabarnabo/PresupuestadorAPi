const mysql = require("mysql");
/* const bcrypt = require("bcrypt"); */
const db = require("../db");
const { handleError, ErrorHandler } = require("../helpers/error");

const getAll = () => {
  console.log("into get all");
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE disabled = NULL`, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch((err) => {
    throw new ErrorHandler(400, err.sqlMessage);
  });
};

const insert = ({ email, password, nombre, apellido, telefono, rol_id }) => {
  password = bcrypt.hashSync(password, 10);

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (email, password, nombre, apellido, telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?) ",
      [email, password, nombre, apellido, telefono, rol_id],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  }).catch((err) => {
    throw new ErrorHandler(400, err.sqlMessage);
  });
};

module.exports = {
  insert: insert,
  getAll: getAll,
};
