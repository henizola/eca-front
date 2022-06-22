const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");

const mongoose = require("mongoose");
const { admin, editor } = require("./super");
const EcaBanner = require("../models/banners-model");

// new Date().toISOString()
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "..", "banners"));
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/add-banner",
  //  editor,
  upload.single("bannerImage"),
  async (req, res) => {
    console.log("req.body");
    const banner = new EcaBanner({
      bannerImage: req.file.filename,
      titleAm: req.body.titleAm,
      titleEn: req.body.titleEn,
    });
    const result = await banner.save();
    console.log(result);
    res.send(result);
  }
);

app.post("/get-banners", async (req, res) => {
  const banners = await EcaBanner.find();

  res.send(banners);
});

app.post(
  "/edit-live-promo",
  editor,
  upload.single("promoImage"),
  async (req, res) => {
    const file = path.join(__dirname, "..", "uploads", req.body.oldPromoImage);
    const promo = await EcaBanner.updateOne({
      $set: { promoImage: req.file.filename },
    });
    if (promo.nModified) {
      fs.unlink(file, (err) => {
        if (err) res.status(500).send(err);
        else {
          return res.send(promo);
        }
      });
      // res.send(feature);
    } else {
      res.send(promo);
    }
  }
);

app.post("/delete-banner", async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send("bad request");
  }
  const blog = await EcaBanner.deleteOne({
    _id: req.body.id,
  });

  if (!blog) {
    return res.status(404).send("Blog Not Found");
  }

  res.send(blog);
});

module.exports = app;
