const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");

const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Products Deleted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}