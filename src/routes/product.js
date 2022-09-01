const express = require("express");

const Router = express.Router();

const productController = require("../controllers/product");

Router.get("/greetings", productController.showGreetings);

module.exports = Router;
