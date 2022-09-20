const express = require("express");

const Router = express.Router();

const bookingController = require("../controllers/booking");

Router.get("/", bookingController.getAllBooking);
Router.get("/:id", bookingController.getBookingById);
Router.post("/", bookingController.createBooking);
Router.patch("/:id", bookingController.updateBooking);
Router.delete("/:id", bookingController.deleteBooking);
Router.get("/section/:id", bookingController.getBookingSection);

module.exports = Router;
