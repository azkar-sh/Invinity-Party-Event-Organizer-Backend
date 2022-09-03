const express = require("express");

const Router = express.Router();

const bookingController = require("../controllers/booking");

Router.get("/", bookingController.getAllBooking);
Router.get("/", bookingController.createBooking);

module.exports = Router;
