const Country = require("../models/Country");

const create_new_country = async (req, res, next) => {
  try {
    let country = await Country.create(req.body);
    res.status(201).send(country);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_all_countries = async function (req, res, next) {
  const { sort } = req.query;
  try {
    let allCountries = await Country.find().sort(
      sort === "true" && { name: 1 }
    );

    res.status(200).send(allCountries);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_country_by_alphaCode = async (req, res, next) => {
  const { code } = req.params;
  try {
    const country = await Country.findOne({
      $or: [{ alpha2Code: code }, { alpha3Code: code }],
    }).collation({ locale: "en", strength: 2 });
    if (!country) {
      return res.status(404).send(`Country not found with alphaCode ${code}`);
    }

    return res.status(200).json({ country });
  } catch (err) {
    next(err);
  }
};

const update_country_by_alphaCode = async (req, res, next) => {
  const { code } = req.params;
  const { name, alpha2Code, alpha3Code } = req.body;

  try {
    const country = await Country.findOneAndUpdate(
      { $or: [{ alpha2Code: code }, { alpha3Code: code }] },
      { name, alpha2Code, alpha3Code },
      { new: true }
    ).collation({ locale: "en", strength: 2 });
    if (!country) {
      return res.status(404).send(`Country not found with alphaCode ${code}`);
    }
    return res.status(200).json({ country });
  } catch (err) {
    next(err);
  }
};

const delete_country_by_alphaCode = async (req, res, next) => {
  const { code } = req.params;
  try {
    const country = await Country.findOneAndDelete({
      $or: [{ alpha2Code: code }, { alpha3Code: code }],
    });
    if (!country) {
      return res.status(404).send(`Country not found with alphaCode ${code}`);
    }
    return res.status(200).json({ country });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create_new_country,
  get_all_countries,
  get_country_by_alphaCode,
  update_country_by_alphaCode,
  delete_country_by_alphaCode,
};
