const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;

const adminControllers = require("../controllers/admin.controllers");

const verifyTokenmiddleware = require("../middlewares/verifyToken.middleware");
const verifyToken = verifyTokenmiddleware;
//multer
const upload = multer({
  storage: multer.diskStorage({
    destination: "product-images/images",

    filename: function (req, file, cb) {
      cb(null, uuid() + "_" + file.originalname);
    },
  }),
});

router.get("/all-products", verifyToken, adminControllers.getProducts);

router.get("/all-products/new", adminControllers.newProduct);

router.post(
  "/all-products/new",
  upload.single("image"),
  adminControllers.postNewProduct
);
router.get("/all-products/:id", adminControllers.getProductToUpdate);
router.delete("/all-products/:id", adminControllers.deleteProduct);
router.put(
  "/all-products/:id",
  upload.single("image"),
  adminControllers.updateProduct
);

router.patch("/orders/:orderId", adminControllers.updateOrder);
module.exports = router;
