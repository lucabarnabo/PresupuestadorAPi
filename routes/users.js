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
  let name = req.body.username;
  let password = req.body.password;
  const user = await Users.login(name, password);
});
module.exports = router;
