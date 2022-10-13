const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadFile");
// const redisMiddleware = require("../middleware/redis");

Router.get("/greetings", userController.showGreetings);
Router.get("/", userController.getAllUser);
Router.get("/:id", authMiddleware.authentication, userController.getUserById);
Router.post("/", userController.createUser);
Router.post(
  "/uploadImage/:id",
  uploadMiddleware.uploadUser,
  userController.uploadImage
);
Router.patch("/updatePassword/:id", userController.updatePassword);
Router.patch("/:id", authMiddleware.authentication, userController.updateUser);
Router.delete("/:id", authMiddleware.authentication, userController.deleteUser);

module.exports = Router;
