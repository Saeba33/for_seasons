const productsManager = require("../services/productsManager");

const browse = async (req, res, next) => {
  try {
    const products = await tables.products.getProducts(req.params.id);
    if (products == null) {
      res.sendStatus(404);
    } else {
    res.status(200).json(products);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
