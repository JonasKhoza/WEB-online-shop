const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const verifyTokenmiddleware = require("../middlewares/verifyToken.middleware");
const verifyToken = verifyTokenmiddleware;

router.get("/signup", userControllers.getSignup);
router.post("/signup", userControllers.getUserSignup);
router.get("/login", userControllers.getLogin);
router.post("/login", userControllers.getUserLogin);
router.get("/isAuth", verifyToken, userControllers.isAuth);
router.get("/logout", userControllers.logoutUser);

// router.get("/login", userControllers.getLogin);
// router.post("/login", userControllers.getUserLogin);

// router.post("/logout", userControllers.logoutUser);
module.exports = router;
