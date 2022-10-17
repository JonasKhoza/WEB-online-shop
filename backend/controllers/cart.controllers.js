const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

function renderCart(req, res, next) {
  const cartItems = { cartItem: req.session.cart };
  if (cartItems) {
    return res.status(201).json(cartItems);
  }
}
async function addItemToCart(req, res, next) {
  //product I will send in a post method
  let product;
  try {
    product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
    return;
  }

  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(
      req.session.cart.items,
      req.session.cart.totalQuantity,
      req.session.cart.totalPrice
    );
  }

  cart.addItemToCart(product);
  req.session.cart = cart;
  //updating the session with the newly added cart
  const cartItems = { cartItem: req.session.cart };
  req.session.save(() => {
    res.json(cartItems);
  });
}

function updateCartProduct(req, res, next) {
  const cart = new Cart(
    req.session.cart.items,
    req.session.cart.totalQuantity,
    req.session.cart.totalPrice
  );

  const updatedItemData = cart.updateCartItem(
    req.body.productId,
    +req.body.newQuantity
  );

  req.session.cart = cart;
  res.status(201).json({
    message: "Cart updated",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  renderCart: renderCart,
  addItemToCart: addItemToCart,
  updateCartProduct: updateCartProduct,
};
