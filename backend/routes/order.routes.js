const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/order.controllers");

router.post("/", ordersControllers.addOrder);
router.get("/user", ordersControllers.getUserOrders);
router.get("/all-orders", ordersControllers.getAllOrders);

module.exports = router;
