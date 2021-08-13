const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  maxRetailPrice: {
    type: Number,
    required: true,
  },
});

module.exports = model("Product", productSchema);
