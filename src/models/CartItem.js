const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  userId: String,
  firebaseId: String,
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
