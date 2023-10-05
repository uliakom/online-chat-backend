const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);

const app = express();

const server = app.listen(3001);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


  const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});