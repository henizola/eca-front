const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");

const mongoose = require("mongoose");
const { admin, editor } = require("./super");

const EcaOrganizationalStructure = require("../models/organizationalStructure-model");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "..", "organizationalStructure"));
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/add-organizationalStructure",
  // editor,

  upload.single("organizationalStructure"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("Plese send a pdf");
    }

    var fileSizeInBytes = req.file.size;

    var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    const organizationalStructure = new EcaOrganizationalStructure({
      name: req.file.originalname,
      fileName: req.file.filename,
      size: fileSizeInMegabytes.toFixed(2),
    });
    const result = await organizationalStructure.save();
    res.send(result);
  }
);

app.post("/get-organizationalStructure", async (req, res) => {
  const ad = await EcaPolicy.find();

  res.status(200).send(ad);
});

app.post(
  "/change-organizationalStructure",
  // editor,
  upload.single("organizationalStructure"),
  async (req, res) => {
    if (!req.file || !req.body.id) {
      return res.status(400).send("bad request");
    }
    const organizationalStructures = await EcaPolicy.findOne({
      _id: req.body.id,
    });
    if (!organizationalStructures) {
      return res.send("not found");
    }
    const file = path.join(
      __dirname,
      "..",
      "organizationalStructure",
      organizationalStructures.fileName
    );

    const feature = await EcaPolicy.updateOne(
      {
        _id: organizationalStructures._id,
      },
      {
        $set: { fileName: req.file.filename },
        $set: { name: req.file.originalname },
      }
    );
    if (feature.nModified) {
      fs.unlink(file, (err) => {
        if (err) res.status(500).send(err);
        else {
          return res.send(feature);
        }
      });
      // res.send(feature);
    } else {
      res.send(feature);
    }
  }
);
app.post("/delete-organizationalStructure", async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send("bad requestssss");
  }
  console.log(req.body.id);

  const blog = await EcaPolicy.deleteOne({
    _id: req.body.id,
  });

  if (!blog) {
    return res.status(404).send("Blog Not Found");
  }

  res.send(blog);
});

module.exports = app;
