const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      // pagination
      // console.log(request.query);
      // eslint-disable-next-line prefer-const
      let { page, limit, name } = request.query;
      page = +page;
      limit = +limit;
      const totalData = await eventModel.getCountEvent();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const offset = page * limit - limit;

      // search
      // const { name } = request.query;

      const result = await eventModel.getAllEvent(offset, limit, name);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Name ${name} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success get All Data!",
        result.data,
        pagination
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
      // console.log(request.body);
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
  updateEvent: async (request, response) => {
    try {
      // console.log(request.params);
      // console.log(request.bdoy);
      const { id } = request.params;
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;

      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      const result = await eventModel.updateEvent(id, setData);

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
  deleteEvent: async (request, response) => {
    try {
      // console.log(request.params);
      // console.log(request.bdoy);
      const { id } = request.params;
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;

      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const deleteData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      const result = await eventModel.deleteEvent(id, deleteData);

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
