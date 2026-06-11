const express = require("express");

// configure router
const router = express.Router();

// import auth middleware
const { protect } = require("../middleware/authMiddleware");

// import cart controller functions
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

// GET CART
router.get("/", protect, getCart);

// ADD TO CART
router.post("/add", protect, addToCart);

// UPDATE CART ITEM
router.put("/update/:itemId", protect, updateCartItem);

// REMOVE CART ITEM
router.delete("/remove/:itemId", protect, removeCartItem);

// CLEAR CART
router.delete("/clear", protect, clearCart);

module.exports = router;