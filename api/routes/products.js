const express = require("express");
const router = express.Router();
const upload = require("../../config/file_upload");
const checkAuth = require("../middleware/auth");
const productController = require("../controllers/products");

router.get("/", productController.get_all_products);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.create_product
);

router.patch("/:id", checkAuth, productController.update_product);

router.delete("/:id", checkAuth, productController.delete_product);

router.get("/:id", productController.get_product);

module.exports = router;
