var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res, next) => {
  try {
    const comidas = await Product.getAll();
    res.json(comidas);
  } catch (error) {
    next(error);
  }
});

router.get("/bebidas", async (req, res, next) => {
  try {
    const comidas = await Product.getBebidas();
    res.json(comidas);
  } catch (error) {
    next(error);
  }
});
router.get("/actividades", async (req, res, next) => {
  try {
    const comidas = await Product.getActividades();
    res.json(comidas);
  } catch (error) {
    next(error);
  }
});
router.get("/comidas", async (req, res, next) => {
  try {
    const comidas = await Product.getComidas();
    res.json(comidas);
  } catch (error) {
    next(error);
  }
});

router.post("/insert", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await Product.insertProduct(req.body);
    res.status(201).json(`Agregaste ${req.body.title} con exito!`);
  } catch (error) {
    next(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const result = await Product.updateProduct(req.body);
    res.status(201).json(`${req.body[0].item} Actualizado`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
