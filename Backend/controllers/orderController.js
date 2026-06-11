const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
};