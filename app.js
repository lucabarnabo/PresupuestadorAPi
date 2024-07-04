var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");

require("dotenv").config();
require("./db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category")
const locationRouter = require("./routes/location")

var app = express();

// ver configuración del motor
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/location", locationRouter);

// atrapar 404 y reenviar al controlador de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// controlador de errores
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
