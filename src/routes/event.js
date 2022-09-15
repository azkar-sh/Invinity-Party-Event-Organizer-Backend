const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadFile");
const redisMiddleware = require("../middleware/redis");

Router.get(
  "/",
  authMiddleware.authentication,
  redisMiddleware.getAllEvent,
  redisMiddleware.clearEvent,
  eventController.getAllEvent
);
Router.get("/:id", eventController.getEventById);
Router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearEvent,
  uploadMiddleware.uploadEvent,
  eventController.createEvent
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  redisMiddleware.clearEvent,
  uploadMiddleware.uploadEvent,
  eventController.updateEvent
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearEvent,
  eventController.deleteEvent
);

module.exports = Router;
