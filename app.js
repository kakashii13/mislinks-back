const express = require("express");
const app = express();
const mongoose = require("mongoose");
const linkRouter = require("./controllers/links");
const { MONGODB_URI } = require("./utils/config");
const cors = require("cors");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("error to connect mongoDB", error);
  }
};

connectMongoDB();

app.use(express.json());
app.use(cors());

app.use("/api/links", linkRouter);

module.exports = app;
