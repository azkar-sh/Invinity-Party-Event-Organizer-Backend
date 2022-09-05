const wishlistModel = require("../models/wishlist");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllWishlist: async (request, response) => {
    try {
      const result = await wishlistModel.getAllWishlist();
      return wrapper.response(
        response,
        result.status,
        "Success get All Data!",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  createWishlist: async (request, response) => {
    try {
      console.log(request.body);
      const { eventId, userid } = request.body;
      const setData = { eventId, userid };

      const result = await wishlistModel.createWishlist(setData);

      return wrapper.response(
        response,
        result.status,
        "Success Create Data!",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
