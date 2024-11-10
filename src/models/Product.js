const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
