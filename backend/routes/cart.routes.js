const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart.controllers");

router.get("/items", cartControllers.renderCart);
router.post("/", cartControllers.addItemToCart);
router.patch("/", cartControllers.updateCartProduct);

module.exports = router;
