const jwt = require("jsonwebtoken");
const client = require("../config/redis");
const wrapper = require("../utils/wrapper");

module.exports = {
  authentication: async (request, response, next) => {
    try {
      let token = request.headers.authorization;

      if (!token) {
        return wrapper.response(response, 403, "Please Login First", null);
      }

      token = token.split(" ")[1];
      const checkTokenBlacklist = await client.get(`accessToken:${token}`);
      // console.log(checkTokenBlacklist);

      if (checkTokenBlacklist) {
        return wrapper.response(
          response,
          403,
          "You've been logged out, Please login!",
          null
        );
      }

      jwt.verify(token, "RAHASIA", (error, result) => {
        if (error) {
          return wrapper.response(response, 403, error.message, null);
        }
        request.decodeToken = result;
        next();
      });
    } catch (error) {
      console.log(error);
    }
  },
  isAdmin: async (request, response, next) => {
    try {
      if (request.decodeToken.role !== 1) {
        return wrapper.response(response, 403, "You are not Admin!", null);
      }
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
};
