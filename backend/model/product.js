const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  discountPercentage: Number,
  brand: String,
  category: String,
  thumbnail: { type: String, required: true },
  images: [String],
  reviews:{type:Object,default:{rating:0,reviewers:0,notes:[]}}

});

const Product = mongoose.model("products", productSchema);

module.exports = Product;


