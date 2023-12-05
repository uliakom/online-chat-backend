const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);

  const authRouter = require("./routes/auth");

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



const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", authRouter);



  const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});