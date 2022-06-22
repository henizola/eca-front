const EcaDirectives = require("../models/directives-model");
const EcaLaws = require("../models/laws-model");
const EcaPolicy = require("../models/policy-model");
const EcaFrameworks = require("../models/frameworks-model");
const API = require("../api.js");

const rednderDirectivesEn = async (req, res) => {
  const directives = await EcaDirectives.find({ name: /nglish/i });

  const law = await EcaLaws.find();

  policy = await EcaPolicy.find();

  framework = await EcaFrameworks.find();

  res.render("resource", {
    directives: directives,
    API: API,
    law: law,
    policy: policy,
    framework: framework,
  });
};

module.exports = rednderDirectivesEn;
