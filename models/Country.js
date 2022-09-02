const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, required: true },
  alpha2Code: { type: String, required: true },
  alpha3Code: { type: String, required: true },
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
