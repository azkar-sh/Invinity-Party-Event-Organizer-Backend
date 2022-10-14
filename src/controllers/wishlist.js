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
  // getAllWishlist: async (request, response) => {
  //   try {
  //     // pagination

  //     let { page, limit } = request.query;
  //     page = +page;
  //     limit = +limit;
  //     const totalData = await wishlistModel.getCountWishlist();
  //     const totalPage = Math.ceil(totalData / limit);
  //     const pagination = {
  //       page,
  //       totalPage,
  //       limit,
  //       totalData,
  //     };
  //     const offset = page * limit - limit;

  //     // search
  //     const { userId } = request.query;

  //     const result = await wishlistModel.getAllWishlist(offset, limit, userId);

  //     return wrapper.response(
  //       response,
  //       result.status,
  //       "Success get All Data!",
  //       result.data,
  //       pagination
  //     );
  //   } catch (error) {
  //     const { status, statusText, error: errorData } = error;
  //     return wrapper.response(response, status, statusText, errorData);
  //   }
  // },
  getWishlistById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await wishlistModel.getWishlistById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Wishlist Id ${id} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by Wishlist Id",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getWishlistByUserId: async (request, response) => {
    try {
      const { userId } = request.params;
      const result = await wishlistModel.getWishlistByUserId(userId);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by User Id ${userId} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by User Id",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getWishlistByEventId: async (request, response) => {
    try {
      const { eventId } = request.params;
      const result = await wishlistModel.getWishlistByEventId(eventId);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by User Id ${eventId} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by User Id",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },

  createWishlist: async (request, response) => {
    try {
      const { eventId, userId } = request.body;
      const setData = {
        eventId,
        userId,
      };

      const checkByEventId = await wishlistModel.getWishlistByEventId(eventId);
      if (checkByEventId.data.length > 0) {
        const id = checkByEventId.data[0].wishlistId;
        const result = await wishlistModel.deleteWishlist(id);
        return wrapper.response(
          response,
          result.status,
          "Success Delete Wishlist",
          result.data
        );
        // console.log(id);
        // console.log(result);
      }

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
  updateWishlist: async (request, response) => {
    try {
      const { id } = request.params;
      const { eventId, userId } = request.body;

      const checkId = await wishlistModel.getWishlistById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const setData = {
        eventId,
        userId,
      };

      const result = await wishlistModel.updateWishlist(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  deleteWishlist: async (request, response) => {
    try {
      const { id } = request.params;
      const { eventId, userId } = request.body;

      const checkId = await wishlistModel.getWishlistById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const deleteData = {
        eventId,
        userId,
      };

      const result = await wishlistModel.deleteWishlist(id, deleteData);

      return wrapper.response(
        response,
        result.status,
        "Success Delete Data!",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
