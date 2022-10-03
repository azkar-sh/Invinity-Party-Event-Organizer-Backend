const bookingSectionModel = require("../models/bookingSection");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllBookingSection: async (request, response) => {
    try {
      const result = await bookingSectionModel.getAllBookingSection();
      return wrapper.response(
        response,
        result.status,
        "Success Get Data!",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },

  createBookingSection: async (request, response) => {
    try {
      const { bookingId, section } = request.body;
      const setData = {
        bookingId,
        section,
      };

      const result = await bookingSectionModel.createBookingSection(setData);

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

  getBookingSectionById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await bookingSectionModel.getBookingSectionById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Booking Id ${id} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by Booking Id",
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
};
