const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
////////////////////////////////////////////////////////////////////
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
////////////////////////////////////////////////////////////////////
const signin = require("./route/sign-in");
const directives = require("./route/directives");
const laws = require("./route/laws");
const frameworks = require("./route/frameworks");
const policy = require("./route/policy");
const banner = require("./route/banner");
const organizationalStructure = require("./route/org-struct");
const renderDirectivesEn = require("./render/render-directivesEn");
const renderSearch = require("./render/render-search");

const bodyParser = require("body-parser");

const app = express();
const rednderDirectivesAm = require("./render/render-directivesAm");
const renderHome = require("./render/render-homeEn");
const renderHomeAm = require("./render/render-HomeAm");
const rednderServices = require("./render/Services");

app.use(cors());
////////////////////////////////////////////////////////////////////////
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost/eca-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDb ..."))
  .catch((error) => console.log("could not connect to database" + error));

app.use(express.static("./banners"));
app.use(express.static("./frameworks"));
app.use(express.static("./laws"));
app.use(express.static("./policy"));
app.use(express.static("./directives"));
app.use(express.static("./organizationalStructure"));

app.use(express.json());

app.use(express.static("./views"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", renderHome);
app.get("/Am", renderHomeAm);

const port = process.env.PORT || 9001;

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/resourceAm", rednderDirectivesAm);
app.get("/services", rednderServices);
app.get("/search", renderSearch);

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/guide", (req, res) => {
  res.render("guide");
});

app.get("/resource", renderDirectivesEn);

app.get("/services", (req, res) => {
  res.render("services");
});

app.use("/api", signin);
app.use("/api", directives);
app.use("/api", laws);
app.use("/api", policy);
app.use("/api", frameworks);
app.use("/api", banner);
app.use("/api", organizationalStructure);

app.listen(port, () => console.log(`listening to port ${port}`));
