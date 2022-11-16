const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const wrapper = require("../utils/wrapper"); // variabel respons when data returned
const cloudinary = require("../config/cloudinary");

module.exports = {
  showGreetings: async (request, response) => {
    try {
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
  getAllUser: async (request, response) => {
    try {
      const result = await userModel.getAllUser();
      return wrapper.response(
        // data from utils/wrapper
        response,
        result.status,
        "Success Get Data !",
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
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await userModel.getUserById(id);

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
  createUser: async (request, response) => {
    try {
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
        role,
      } = request.body;
      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
        role,
      };

      const result = await userModel.createUser(setData);

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
  updateUser: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        phone,
      } = request.body;

      const checkId = await userModel.getUserById(id);

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
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        phone,
        updatedAt: "now()",
      };

      const result = await userModel.updateUser(id, setData);

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
  updatePassword: async (request, response) => {
    try {
      const { id } = request.params;
      const { oldPassword, newPassword, confirmPassword } = request.body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        return wrapper.response(response, 400, "Please fill all field!", null);
      }

      if (newPassword !== confirmPassword) {
        return wrapper.response(
          response,
          400,
          "Confirm Password doesn't match!",
          null
        );
      }

      if (newPassword.length < 6 || confirmPassword.length < 6) {
        return wrapper.response(
          response,
          400,
          "Password should be at least six characters.",
          null
        );
      }

      const checkId = await userModel.getUserById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const currPassword = checkId.data[0].password;
      // comparing old password with current password
      const matchPassword = await bcrypt.compare(oldPassword, currPassword);
      // hash new Password
      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      if (!matchPassword) {
        return wrapper.response(
          response,
          400,
          "Your Old Password incorrect!",
          null
        );
      }

      const setData = {
        password: hashNewPassword,
      };

      const result = await userModel.updateUser(id, setData);

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
  uploadImage: async (request, response) => {
    try {
      const { id } = request.params;
      const { filename, mimetype } = request.file;

      const checkId = await userModel.getUserById(id);
      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data by Id ${id} isn't Found!`,
          []
        );
      }

      const setData = {
        updatedAt: "now()",
        image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
      };

      const result = await userModel.uploadImage(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Upload Image User!",
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
  deleteUser: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await userModel.getUserById(id);

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

      const result = await userModel.deleteUser(id);

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
