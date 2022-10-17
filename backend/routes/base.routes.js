const express = require("express");
const router = express.Router();

const baseControllers = require("../controllers/base.controllers");

router.get("/", baseControllers.getHome);
router.get("/:id", baseControllers.getProduct);

module.exports = router;
