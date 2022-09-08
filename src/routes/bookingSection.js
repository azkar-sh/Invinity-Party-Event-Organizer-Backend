const express = require("express");

const Router = express.Router();

const bookingSectionController = require("../controllers/bookingSection");

Router.get("/", bookingSectionController.getAllBookingSection);
Router.get("/:id", bookingSectionController.getBookingSectionById);
Router.post("/", bookingSectionController.createBookingSection);

module.exports = Router;
