const mysql = require("mysql");
/* const bcrypt = require("bcrypt"); */
/* const db = require("../db"); */
const moment = require("moment");
const { handleError, ErrorHandler } = require("../helpers/error");
const jwt = require("jwt-simple");
/* const speakeasy = require("speakeasy"); */
/* const qrcode = require("qrcode"); */

const userController = {};

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
  if (password != user.password) {
    return (error = {
      code: 203,
      message: "contraseña Incorrecta",
    });
  }
  let token = await createToken(user);
  return token;
};

const createToken = async (user) => {
  let payload = {
    userId: user.id,
    createdAT: moment().unix(),
    expiresAT: moment().add(1, "day").unix(),
  };
  return await jwt.encode(payload, process.env.TOKEN_KEY);
};

/* const enableTwoFactorAuthStep1 = async function (req, reply) {
  tokenVerification.extractAndVerifyJwtToken(
    req,
    (err, isValidToken, email) => {
      if (!err && isValidToken) {
        const secret = speakeasy.generateSecret();
        qrcode.toDataURL(secret.otpauth_url, function (err, qrImage) {
          if (!err) {
            reply.code(200).send({ qr: qrImage, secret: secret });
          } else {
            reply.internalServerError(err);
          }
        });
      } else {
        reply.unauthorized(err);
      }
    }
  );
};
 */
/* const enableTwoFactorAuthStep2 = async function (req, reply) {
  tokenVerification.extractAndVerifyJwtToken(
    req,
    (err, isValidJwtToken, email) => {
      if (!err && isValidJwtToken) {
        const user = db.getUser(email);
        if (typeof user !== "undefined") {
          const base32secret = req.body.base32;
          const userToken = req.body.token;
          const verified = speakeasy.totp.verify({
            secret: base32secret,
            encoding: "base32",
            token: userToken,
          });
          if (verified) {
            db.enableTwoFactorAuthentication(email, base32secret);
            reply.code(200).send({ validated: true });
          } else {
            reply.code(200).send({ validated: false });
          }
        }
      } else {
        reply.unauthorized(err);
      }
    }
  );
}; */

module.exports = {
  insert: insert,
  getAll: getAll,
  login: login,
  /* enableTwoFactorAuthStep1: enableTwoFactorAuthStep1,
  enableTwoFactorAuthStep2: enableTwoFactorAuthStep2, */
};
