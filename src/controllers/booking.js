const bookingModel = require("../models/booking");
// const bookingSection = require("../models/bookingSection");
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

      //--------------
      // if (result.setData(totalTicket >= 1)) {
      //   const { bookingId, section } = request.body;
      //   const setDataSection = { bookingId, section };
      //   const resultSection = await bookingSection.createBookingSection(
      //     setDataSection
      //   );
      //   return resultSection;
      // }
      //-------------
      // const sectionBook = await result.setData("bookingId")
      // const bookingIds = _.map(bookings, (el) => el.id)
      // const sections = await result.setData('booking_section').select().whereIn('booking_id', bookingIds)
      // const groupedSection = _.groupBy(sections, 'booking_id')
      // //----------------
      // const users = await database("user").select();
      // const usersIds = _.map(users, (el) => el.id);
      // const Hobbies = await database('user_hobbies').select().whereIn('user_id', usersIds)
      // const groupedHobbies = _.groupBy(Hobbies, 'user_id');

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
};
