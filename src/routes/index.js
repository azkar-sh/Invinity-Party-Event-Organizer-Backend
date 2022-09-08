const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");
const userRoutes = require("./user");
const eventRoutes = require("./event");
const wishlistRoutes = require("./wishlist");
const bookingRoutes = require("./booking");
const bookingSectionRoutes = require("./bookingSection");

// Router.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

Router.use("/product", productRoutes);
Router.use("/user", userRoutes);
Router.use("/event", eventRoutes);
Router.use("/wishlist", wishlistRoutes);
Router.use("/booking", bookingRoutes);
Router.use("/bookingSection", bookingSectionRoutes);

module.exports = Router;
