var express = require("express");
var countriesRouter = express.Router();

const {
  create_new_country,
  get_all_countries,
  get_country_by_alphaCode,
  update_country_by_alphaCode,
  delete_country_by_alphaCode,
} = require("../controllers/countriesController.js");

countriesRouter.route("/").get(get_all_countries).post(create_new_country);

countriesRouter
  .route("/:code")
  .get(get_country_by_alphaCode)
  .put(update_country_by_alphaCode)
  .delete(delete_country_by_alphaCode);

module.exports = countriesRouter;
