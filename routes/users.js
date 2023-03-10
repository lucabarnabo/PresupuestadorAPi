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
    const user = await Users.login(req.body.username, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
});
module.exports = router;
