const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");
const userRoutes = require("./user");
const eventRoutes = require("./event");

// Router.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

Router.use("/product", productRoutes);
Router.use("/user", userRoutes);
Router.use("/event", eventRoutes);

module.exports = Router;
