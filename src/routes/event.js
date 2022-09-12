const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
// const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadFile");

Router.get("/", eventController.getAllEvent);
Router.get("/:id", eventController.getEventById);
// Router.get("/id", eventController.searchEvent);
Router.post("/", uploadMiddleware.uploadEvent, eventController.createEvent);
Router.patch("/:id", eventController.updateEvent);
Router.delete("/:id", eventController.deleteEvent);

module.exports = Router;
