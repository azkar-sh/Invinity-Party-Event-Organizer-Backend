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
      const { totalTicket, totalPayment, paymentMethod, statusPayment } =
        request.body;
      const setData = {
        totalTicket,
        totalPayment,
        paymentMethod,
        statusPayment,
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
};
