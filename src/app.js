/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNavigation = require("./routes"); // variabel rute

const app = express();
// const port = 3001;
const port = process.env.DB_PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

// path

app.use("/api", routerNavigation); // rute yang dilalui pada awal

app.use("/*", (req, res) => {
  res.status(404).send("Path not found!");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
