const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        color: String,
        size: String,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: String,
      city: String,
      zipCode: String,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
