const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET ALL PRODUCTS
// CREATE PRODUCT
router.route("/")
  .get(getProducts)
  .post(createProduct);

// GET ONE PRODUCT
// UPDATE PRODUCT
// DELETE PRODUCT
router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;