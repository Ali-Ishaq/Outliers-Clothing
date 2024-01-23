const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: [true, 'Input Field can"t be empty'] },
  email: { type: String, required: [true, 'Input Field can"t be empty'] },
  phone: { type: Number, required: [true, 'Input Field can"t be empty'] },
  username: { type: String, required: [true, 'Input Field can"t be empty'] },
  password: { type: String, required: [true, 'Input Field can"t be empty'] },
  cart: [{ product_id:{type:String},
   quantity: { type: Number } }],
  role: { type: String, default: "user" },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
