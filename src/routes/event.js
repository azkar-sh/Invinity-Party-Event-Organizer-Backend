const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadFile");
const redisMiddleware = require("../middleware/redis");

Router.get("/", redisMiddleware.getAllEvent, eventController.getAllEvent);
Router.get("/:id", eventController.getEventById);
Router.post(
  "/",
  authMiddleware.authentication,
  uploadMiddleware.uploadEvent,
  eventController.createEvent
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  uploadMiddleware.uploadEvent,
  eventController.updateEvent
);
Router.delete("/:id", eventController.deleteEvent);

module.exports = Router;
