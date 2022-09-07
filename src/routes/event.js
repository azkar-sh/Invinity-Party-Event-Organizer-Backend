const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");

Router.get("/", eventController.getAllEvent);
Router.get("/:id", eventController.getEventById);
// Router.get("/id", eventController.searchEvent);
Router.post("/", eventController.createEvent);
Router.patch("/:id", eventController.updateEvent);
Router.delete("/:id", eventController.deleteEvent);

module.exports = Router;
