const express = require("express");
const productController = require("../controller/productController");
const productRouter = express.Router();

productRouter
  .post("/", productController.createProduct)
  .get("/category/:category", productController.getAllProduct)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct)
  .post('/stripe-payment-url',productController.stripePaymentUrl)
  .post('/create-payment-intent',productController.payment_intent)
  

exports.route = productRouter;
