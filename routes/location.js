var express = require("express");
var router = express.Router();
var Location = require("../models/Location")

router.get("/", async (req, res, next) => {
  try {
      const location = await Location.getAll();
    res.json(location);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
    try {
    const location = await Location.insert(req.body);
    res.json(location);
  } catch (error) {
    next(error);
  }
});

module.exports = router;