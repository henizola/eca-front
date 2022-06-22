const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");

const mongoose = require("mongoose");
const { admin, editor } = require("./super");

const EcaLaws = require("../models/laws-model");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "..", "laws"));
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/add-law",
  // editor,

  upload.single("law"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("Plese send a pdf");
    }

    var fileSizeInBytes = req.file.size;

    var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    const law = new EcaLaws({
      name: req.file.originalname,
      fileName: req.file.filename,
      size: fileSizeInMegabytes.toFixed(2),
    });
    const result = await law.save();
    res.send(result);
  }
);

app.post("/get-laws", async (req, res) => {
  const ad = await EcaLaws.find();

  res.status(200).send(ad);
});

app.post(
  "/change-law",
  // editor,
  upload.single("law"),
  async (req, res) => {
    if (!req.file || !req.body.id) {
      return res.status(400).send("bad request");
    }
    const lawss = await EcaLaws.findOne({
      _id: req.body.id,
    });
    if (!lawss) {
      return res.send("not found");
    }
    const file = path.join(__dirname, "..", "laws", lawss.fileName);

    const feature = await EcaLaws.updateOne(
      {
        _id: lawss._id,
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
app.post("/delete-law", async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send("bad requestssss");
  }
  console.log(req.body.id);

  const blog = await EcaLaws.deleteOne({
    _id: req.body.id,
  });

  if (!blog) {
    return res.status(404).send("Blog Not Found");
  }

  res.send(blog);
});

module.exports = app;
