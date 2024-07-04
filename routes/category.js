var express = require("express");
var router = express.Router();
var Category = require("../models/Category")

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
    try {
    const categories = await Category.insert(req.body);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;