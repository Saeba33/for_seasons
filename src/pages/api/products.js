const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const products = await tables.products.readAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const product = await tables.products.readProduct(req.params.id);
    if (!product) return res.sendStatus(404);
    else {
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const product = await tables.products.updateAllFromOneProduct(req.body);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

const add = async (req, res, next) => {
  const product = req.body;
  try {
    const insertId = await tables.products.createProduct(product);
    res.status(201).json({ insertId });
  } catch (err) {
    res.status(500).json({ message: "Can't add any reservation" });
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tables.products.deleteOneProduct(id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

module.exports = { browse, read, edit, add, destroy };
