const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");
const cloudinary = require("../config/cloudinary");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      // pagination
      // console.log(request.query);
      // eslint-disable-next-line prefer-const
      let { page, limit, sort } = request.query;
      page = +page || 1;
      limit = +limit || 10;

      const totalData = await eventModel.getCountEvent();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const offset = page * limit - limit;

      // dynamic sorting and searching
      let sortColumn = "createdAt";
      let sortType = "asc";
      if (sort) {
        sortColumn = sort.split("-")[0];
        sortType = sort.split("-")[1];
      }
      if (sortType.toLowerCase() === "asc") {
        sortType = true;
      } else {
        sortType = false;
      }

      const result = await eventModel.getAllEvent(
        offset,
        limit,
        sortColumn,
        sortType
      );

      if (result.data.length < 1) {
        return wrapper.response(response, 404, `Data is not Found!`, []);
      }

      client.setEx(
        `getEvent:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result: result.data, pagination })
      );

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
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const { filename, mimetype } = request.file;
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
      };

      const result = await eventModel.createEvent(setData);
      //-----
      // client.setEx(
      //   `getEvent:${JSON.stringify(request.query)}`,
      //   3600,
      //   JSON.stringify({ result: result.data })
      // );

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
      const { id } = request.params;
      const { filename, mimetype } = request.file;
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

      // updateAt
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        updateAt: "now()",
        image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
      };

      cloudinary.uploader.destroy(
        checkId.data[0].image.split(".")[0],
        (result) => result
      );

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

      cloudinary.uploader.destroy(
        checkId.data[0].image.split(".")[0],
        (result) => result
      );

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
