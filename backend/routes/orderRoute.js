const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/orderController");

orderRouter
  .get("/getAllOrders", orderController.getAllOrders)
  .get("/getUserOrders/:id", orderController.getUserOrders)
  .get("/:id", orderController.getOrderDetails)
  .get("/deliveredOrders/:id", orderController.getDeliveredOrderDetails)
  .get(
    "/checkProductPurchase/:orderId/:productId",
    orderController.checkProductPurchase
  )
  .put("/changestatus/:id", orderController.changeOrderStatus)
  .post("/addProductReview", orderController.addReview)
  .post("/placeOrder", orderController.placeOrder);

exports.route = orderRouter;
