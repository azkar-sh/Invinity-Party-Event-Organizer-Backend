const express = require("express");

const Router = express.Router();

const bookingController = require("../controllers/booking");

Router.get("/", bookingController.getAllBooking);
Router.get("/:id", bookingController.getBookingById);
Router.post("/", bookingController.createBooking);

module.exports = Router;
