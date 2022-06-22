const mongoose = require("mongoose");

const EcaPolicy = new mongoose.model(
  "EcaPolicy",
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

module.exports = EcaPolicy;
