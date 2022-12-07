const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");

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
  register: async (request, response) => {
    try {
      const { username, email, password, confirmpassword } = request.body;

      // if (!username || !email || !password || !confirmpassword) {
      //   return wrapper.response(response, 400, "Please fill all the field!");
      // }

      if (password !== confirmpassword) {
        return wrapper.response(response, 400, "Password not match!");
      }

      const hashPass = await bcrypt.hash(password, 10);
      const setData = {
        username,
        email,
        password: hashPass,
      };

      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length) {
        return wrapper.response(response, 404, "Email Registered", null);
      }

      const result = await authModel.register(setData);

      const responData = { userId: result.data[0].userId };
      return wrapper.response(
        response,
        result.status,
        "Success Create Data!",
        responData
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
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const validateEmail = () =>
        email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if (!validateEmail(email)) {
        return wrapper.response(response, 400, "Email is not valid", null);
      }

      // 1. PROSES PENGECEKAN EMAIL
      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length < 1) {
        return wrapper.response(response, 404, "Email Not Registered", null);
      }

      // 2. PROSES PENCOCOKAN PASSWORD
      const validPassword = await bcrypt.compare(
        password,
        checkEmail.data[0].password
      );
      if (!validPassword) {
        return wrapper.response(response, 400, "Wrong Password", null);
      }

      const payload = {
        userId: checkEmail.data[0].userId,
        name: checkEmail.data[0].name,
        role: !checkEmail.data[0].role ? "user" : checkEmail.data[0].role,
      };

      const token = jwt.sign(payload, process.env.ACCESS_KEYS, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_KEYS, {
        expiresIn: "48h",
      });
      // 4. PROSES RESPONCE KE USER
      return wrapper.response(response, 200, "Success Login", {
        userId: payload.userId,
        token,
        name: payload.name,
        refreshToken,
      });
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  logout: async (request, response) => {
    try {
      let token = request.headers.authorization;
      const { refreshtoken } = request.headers;
      // eslint-disable-next-line prefer-destructuring
      token = token.split(" ")[1];

      client.setEx(`accessToken:${token}`, 3600 * 48, token);
      client.setEx(`refreshToken:${refreshtoken}`, 3600 * 48, refreshtoken);

      return wrapper.response(response, 200, "Success Logout", null);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  refresh: async (request, response) => {
    try {
      const { refreshtoken } = request.headers;

      if (!refreshtoken) {
        return wrapper.response(response, 400, "Refresh Token Must Be Filled");
      }

      const checkTokenBlacklist = await client.get(
        `refreshToken:${refreshtoken}`
      );

      if (checkTokenBlacklist) {
        return wrapper.response(
          response,
          403,
          "Your Token is Expired, Please login!",
          null
        );
      }

      let payload;
      let token;
      let newRefreshToken;

      jwt.verify(refreshtoken, process.env.REFRESH_KEYS, (error, result) => {
        if (error) {
          return wrapper.response(response, 403, error.message, null);
        }
        payload = {
          userId: result.userId,
          role: result.role,
        };
        token = jwt.sign(payload, process.env.ACCESS_KEYS, {
          expiresIn: "1h",
        });
        newRefreshToken = jwt.sign(payload, process.env.REFRESH_KEYS, {
          expiresIn: "36h",
        });
        client.setEx(`refreshToken:${refreshtoken}`, 3600 * 36, refreshtoken);
      });

      return wrapper.response(response, 200, "Success Refresh Token", {
        userId: payload.userId,
        token,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.log(error);
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
