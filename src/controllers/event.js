const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      const result = await eventModel.getAllEvent();
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
  getEventById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await eventModel.getEventById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Event Id ${id} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by Event Id",
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
  createEvent: async (request, response) => {
    try {
      console.log(request.body);
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      const result = await eventModel.createEvent(setData);

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