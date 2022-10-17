const Product = require("../models/product.model");

async function getHome(req, res, next) {
  try {
    const products = await Product.findAll();
    if (products) {
      return res.status(201).json({ products });
    }
    res.status(400).json({ message: "Could not find products" });
  } catch (err) {
    return next(err);
  }
}
async function getProduct(req, res, next) {
  const productId = String(req.params.id);

  try {
    const product = await Product.findById(productId);

    if (product) {
      res.status(201).json({ product: product });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getHome: getHome,
  getProduct: getProduct,
};
