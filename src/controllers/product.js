const { response } = require("express");

module.exports = {
  showGreetings: async (request, require) => {
    try {
      response.status(200).send("Hello World!");
    } catch (error) {
      console.log(error);
    }
  },
};
