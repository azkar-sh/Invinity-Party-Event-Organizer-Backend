const express = require("express");

const Router = express.Router();

const wishlistController = require("../controllers/wishlist");
const authMiddleware = require("../middleware/auth");

Router.get(
  "/",
  authMiddleware.authentication,
  wishlistController.getAllWishlist
);
Router.get(
  "/:id",
  authMiddleware.authentication,
  wishlistController.getWishlistById
);
Router.post(
  "/",
  authMiddleware.authentication,
  wishlistController.createWishlist
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  wishlistController.deleteWishlist
);

module.exports = Router;
