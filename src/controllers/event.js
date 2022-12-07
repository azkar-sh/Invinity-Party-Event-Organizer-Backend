const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");
const cloudinary = require("../config/cloudinary");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      // pagination
      // eslint-disable-next-line prefer-const
      let { page, limit, name, sortColumn, sortType, dateTimeShow } =
        request.query;
      page = +page || 1;
      limit = +limit || 10;
      name = `${name}`;

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
      sortColumn = sortColumn || "createdAt";
      sortType = sortType || "asc";
      // if (sort) {
      //   // eslint-disable-next-line prefer-destructuring
      //   sortColumn = sort.split("-")[0];
      //   // eslint-disable-next-line prefer-destructuring
      //   sortType = sort.split("-")[1];
      // }
      if (sortType.toLowerCase() === "asc") {
        sortType = true;
      } else {
        sortType = false;
      }

      let day;
      let nextDay;
      if (dateTimeShow) {
        day = new Date(dateTimeShow);
        nextDay = new Date(new Date(day).setDate(day.getDate() + 1));
      }

      const result = await eventModel.getAllEvent(
        offset,
        limit,
        name,
        sortColumn,
        sortType,
        day,
        nextDay
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
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
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

      client.setEx(`getEvent:${id}`, 3600, JSON.stringify(result.data));

      // client.setEx(
      //   `getEvent:${JSON.stringify(request.params)}`,
      //   3600,
      //   JSON.stringify({ result: result.data })
      // );

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

      let setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      if (request.file) {
        const { filename, mimetype } = request.file;
        setData = {
          ...setData,
          image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
        };
      }

      const result = await eventModel.createEvent(setData);

      return wrapper.response(
        response,
        result.status,
        "Success Create Data!",
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
  updateEvent: async (request, response) => {
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

      // updateAt
      let setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        updateAt: "now()",
      };

      if (request.file) {
        const { filename, mimetype } = request.file;
        setData = {
          ...setData,
          image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
        };
        cloudinary.uploader.destroy(
          checkId.data[0].image.split(".")[0],
          (result) => result
        );
      }
      const result = await eventModel.updateEvent(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
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
  deleteEvent: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      cloudinary.uploader.destroy(
        checkId.data[0].image.split(".")[0],
        (result) => result
      );

      const result = await eventModel.deleteEvent(id);

      return wrapper.response(
        response,
        result.status,
        "Success Delete Data!",
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
