const mysql = require("mysql");
/* const bcrypt = require("bcrypt"); */
/* const db = require("../db"); */
const { handleError, ErrorHandler } = require("../helpers/error");

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
  const user = await getByName(username);
  if (!user) {
    return false;
  } else {
    return await checkPassword(password, user[0].password);
  }
};

const checkPassword = async (password, userPassword) => {
  /* const equals = bcrypt.compareSync (password, userPassword); */

  let token = async () => {
    if (password === userPassword) {
      res.status(200).json({
        token: createToken(user),
        id: user.id,
        rol_id: user.rol_id,
        nombre: user.nombre,
        apellido: user.apellido,
        message: "Inicio de sesión correcta",
      });
    } else {
      res.status(401).json("Error, nombre o contraseña no encontrados");
    }
  };
  console.log(token);
  return await token;
};

const createToken = async (user) => {
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
