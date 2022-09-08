const bookingModel = require("../models/booking");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllBooking: async (request, response) => {
    try {
      const result = await bookingModel.getAllBooking();
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

  createBooking: async (request, response) => {
    try {
      console.log(request.body);
      const { userId, eventId, totalTicket, totalPayment, paymentMethod } =
        request.body;
      const setData = {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
      };

      const result = await bookingModel.createBooking(setData);

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

  getBookingById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await bookingModel.getBookingById(id);

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
  updateBooking: async (request, response) => {
    try {
      // console.log(request.params);
      // console.log(request.bdoy);
      const { id } = request.params;
      const { userId, eventId, totalTicket, totalPayment, paymentMethod } =
        request.body;

      const checkId = await bookingModel.getBookingById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const setData = {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
      };

      const result = await bookingModel.updateBooking(id, setData);

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
  deleteBooking: async (request, response) => {
    try {
      // console.log(request.params);
      // console.log(request.bdoy);
      const { id } = request.params;
      const { userId, eventId, totalTicket, totalPayment, paymentMethod } =
        request.body;

      const checkId = await bookingModel.getBookingById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const deleteData = {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
      };

      const result = await bookingModel.deleteBooking(id, deleteData);

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
