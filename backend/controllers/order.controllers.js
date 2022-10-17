const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

async function getUserOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(req.session.uid);

    res.json({ orders: orders });
  } catch (error) {
    return res.json({
      error:
        "Unfortunately, something went wrong in our server. We are working to fix that",
    });
  }
}
async function addOrder(req, res, next) {
  const cart = new Cart(
    req.session.cart.items,
    req.session.cart.totalQuantity,
    req.session.cart.totalPrice
  );
  let userDocument;
  try {
    userDocument = await User.findById(req.session.uid);
  } catch (error) {
    res.json({ message: "Unfortunately, something went wrong!" });
    next(error);
    return;
  }
  const order = new Order(cart, userDocument);
  try {
    await order.save();
  } catch (error) {
    res.json({ message: "Unfortunately, something went wrong!" });
    next(error);
    return;
  }
  req.session.cart = null;
  res.json({ message: "Order created" });
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    res.json({ orders: orders });
  } catch (error) {
    return res.json({
      message:
        "Unfortunately, something went wrong in our server. We are working to fix that!",
    });
  }
}

module.exports = {
  addOrder: addOrder,
  getUserOrders: getUserOrders,
  getAllOrders: getAllOrders,
};
