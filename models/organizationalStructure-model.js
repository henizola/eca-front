const mongoose = require("mongoose");

const EcaOrganizationalStructure = new mongoose.model(
  "EcaOrganizationalStructure",
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

module.exports = EcaOrganizationalStructure;
