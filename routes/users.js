var express = require("express");
var router = express.Router();
const Users = require("../models/Users");
const jwt = require("jwt-simple");
/* const bcrypt = require("bcrypt"); */

router.get("/", async (req, res, next) => {
  try {
    const user = await Users.getAll();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:email", async (req, res, next) => {
  try {
    const user = await Users.getByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await Users.login(
      req.body.username,
      passreq.body.passwordword
    );
    console.log("user en ruta", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
});
module.exports = router;

/* res.status(200).json({
        token: createToken(user),
        nombre: user.nombre,
        apellido: user.apellido,
        message: "Inicio de sesión correcta",
      });
    } else {
      res.status(401).json("Error, nombre o contraseña no encontrados");
    } */
