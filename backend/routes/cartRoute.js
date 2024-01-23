const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cartController");


cartRouter.post('/updatecart',cartController.updateCart)






exports.route = cartRouter;