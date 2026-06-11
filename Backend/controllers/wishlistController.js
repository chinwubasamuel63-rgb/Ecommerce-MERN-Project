const User = require("../models/User");

// GET WISHLIST
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist");

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// TOGGLE WISHLIST
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    const exists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
};