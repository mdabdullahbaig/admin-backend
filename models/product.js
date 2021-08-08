const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: "string",
    required: true,
    unique: true,
  },
  imageUrl: {
    type: "string",
    required: true,
    unique: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: "string",
    required: true,
  },
  productSellPrice: {
    type: "number",
    required: true,
  },
  productMRP: {
    type: "number",
    required: true,
  },
  costPerItem: {
    type: "number",
    required: true,
  },
  status: {
    type: "boolean",
    default: true,
  },
  quantity: {
    type: "number",
    required: true,
  },
});

module.exports = model("Product", productSchema);
