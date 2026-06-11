const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes and database connection
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start the server
const PORT = process.env.PORT || 5000;

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
