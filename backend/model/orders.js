const mongoose = require("mongoose");
const { Schema } = mongoose;

// const orderSchema = new Schema({
//   shippingAmount:{type:Number},
//   orderStatus: { type: String, default: "pending" },
//   orderDate: { type: String },
//   orderAmount: { type: Number },
//   orderItems: [{isProductreviewed:{type:Boolean}}],
//   paymentStatus: { type: String, default: "pending" },
//   userId: { type: String },
//   deliveryInfo: {},
  
// });



const orderSchema = new mongoose.Schema({
  orderStatus: {
    type: String,
    default: "pending",
    required: true
  },
  orderDate: {
    type: String,
    required: true
  },
  orderAmount: {
    type: Number,
    required: true
  },
  orderItems: [
    {
      CartImg: String,
      CartName: String,
      CartPrice: Number,
      id: String,
      productcode: String,
      quantity: Number,
      isProductreviewed: {
        type: Boolean,
        default: false
      }
    }
  ],
  paymentStatus: {
    type: String,
    
  },
  userId: {
    type: String,
    required: true
  },
  deliveryInfo: {
    firstname: String,
    lastName: String,
    streetAddress: String,
    country: String,
    city: String,
    email: String,
    phone: Number,
    zip: Number,
    deliveryCharges: Number
  }
});



const Order = mongoose.model("order", orderSchema);

module.exports = Order;
