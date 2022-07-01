const mongoose = require("mongoose");

const EcaLaws = new mongoose.model(
  "EcaLaws",
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

module.exports = EcaLaws;
