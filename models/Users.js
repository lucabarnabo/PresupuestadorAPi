const mysql = require("mysql");
/* const bcrypt = require("bcrypt"); */
/* const db = require("../db"); */
const moment = require("moment");
const { handleError, ErrorHandler } = require("../helpers/error");
const jwt = require("jwt-simple");

const db = mysql.createPool({
  hots: process.env.DB_HOST,
  user: "root",
  password: "root",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const getAll = async () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users`, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch((err) => {
    throw new ErrorHandler(400, err.sqlMessage);
  });
};

const getByName = async (nombreUsuario) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE username = '${nombreUsuario}'`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
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

const login = async (username, password) => {
  let user = await getByName(username);
  if (!user) {
    return false;
  } else {
    user[0].token = await checkPassword(password, user[0]);
    user = user[0];
    return user;
  }
};

const checkPassword = async (password, user) => {
  /* const equals = bcrypt.compareSync (password, userPassword); */
  console.log("into token", password === user.password);
  if (password != user.password) {
    return (error = {
      code: 203,
      message: "contraseña Incorrecta",
    });
  }
  return await createToken(user);
};

const createToken = async (user) => {
  console.log("into create token");
  let payload = {
    userId: user.id,
    createdAT: moment().unix(),
    expiresAT: moment().add(1, "day").unix(),
  };
  return await jwt.encode(payload, process.env.TOKEN_KEY);
};

module.exports = {
  insert: insert,
  getAll: getAll,
  login: login,
};
