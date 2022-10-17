const Product = require("../models/product.model");
const Order = require("../models/order.model");
async function getProducts(req, res, next) {
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

function newProduct(req, res) {}

async function postNewProduct(req, res, next) {
  const title = req.body.title;
  const image = req.file.path;
  const summary = req.body.summary;
  const price = req.body.price;
  const description = req.body.description;
  const instock = req.body.inStock;

  const product = new Product(
    title,
    image,
    summary,
    price,
    description,
    instock
  );
  try {
    await product.save();
    res.status(201).json({ success: "Successfully created the product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
}

async function deleteProduct(req, res, next) {
  const productId = req.params.id;

  let deletedProduct;
  try {
    deletedProduct = await Product.deleteProduct(productId);

    if (deletedProduct) {
      res.json({ success: "Successfully deleted the product!" });
    }
  } catch (error) {
    return next(error);
  }
}

async function getProductToUpdate(req, res, next) {
  const productId = req.params.id;

  try {
    const productToUpdate = await Product.findById(productId);

    if (productToUpdate || productToUpdate.length < 0) {
      return res.json({ product: productToUpdate });
    }
    res.json({ message: "No product " });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  const title = req.body.title;
  const image = req.file.path;
  const summary = req.body.summary;
  const price = req.body.price;
  const instock = req.body.instock;
  const description = req.body.description;
  const productId = req.params.id;

  //title, image, summary, price, description, instock, id
  const productToUpdate = new Product(
    title,
    image,
    summary,
    price,
    description,
    instock,
    productId
  );

  try {
    await productToUpdate.updateProduct();
    res.json({ success: "Succesfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not update product" });
  }
}

async function updateOrder(req, res) {
  const newStatus = req.body.newStatus;
  const orderId = req.params.orderId;

  //cart, userData, status = "pending", date, orderId
  //cart, userData, status = "pending", date, orderId
  const order = new Order(null, null, newStatus, null, orderId);

  try {
    await order.save();

    res.json({ success: "Success" });
  } catch (error) {
    console.log(error);
    res.json({
      message:
        "Unfortunately, something went wrong in our server. We are working to fix that!",
    });
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  newProduct: newProduct,
  postNewProduct: postNewProduct,
  deleteProduct: deleteProduct,
  getProductToUpdate: getProductToUpdate,
  updateProduct: updateProduct,
  updateOrder: updateOrder,
};
