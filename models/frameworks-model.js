const mongoose = require("mongoose");

const EcaFrameworks = new mongoose.model(
  "EcaFrameworks",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  })
);

module.exports = EcaFrameworks;
