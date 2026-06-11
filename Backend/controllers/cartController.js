const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET USER CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      qty,
      color,
      size,
    } = req.body;

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }
//     console.log("Incoming:", {
//   productId,
//   color,
//   size,
// });

// console.log(
//   cart.items.map((item) => ({
//     product: item.product.toString(),
//     color: item.color,
//     size: item.size,
//   }))
// );

    const existingItem = cart.items.find(
  (item) =>
    item.product.toString() === productId &&
    item.color === color &&
    String(item.size) === String(size)
);

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: productId,
        qty,
        color,
        size,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(
      cart._id
    ).populate("items.product");

    res.status(201).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE CART ITEM
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.id(
      req.params.itemId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    item.qty = qty;

    await cart.save();

    const updatedCart = await Cart.findById(
      cart._id
    ).populate("items.product");

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// REMOVE CART ITEM
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.id(
      req.params.itemId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    item.deleteOne();

    await cart.save();

    const updatedCart = await Cart.findById(
      cart._id
    ).populate("items.product");

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};