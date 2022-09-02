const productModel = require("../models/product");
const wrapper = require("../utils/wrapper"); // variabel respons when data returned

module.exports = {
  showGreetings: async (request, response) => {
    try {
      // return response.status(200).send("Hello World!");
      return wrapper.response(
        response,
        200,
        "Success Get Greetings",
        "Hello World !"
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
  getAllProduct: async (request, response) => {
    try {
      const result = await productModel.getAllProduct();
      return wrapper.response(
        // data from utils/wrapper
        response,
        result.status,
        "Success Get Data !",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await productModel.getProductById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data by Id",
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
  createProduct: async (request, response) => {
    try {
      console.log(request.body);
      const { name, price } = request.body;
      const setData = {
        name,
        price,
      };

      const result = await productModel.createProduct(setData);

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
