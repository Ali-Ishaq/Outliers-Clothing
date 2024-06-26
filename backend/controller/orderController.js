const Order = require("../model/orders");
const Product = require("../model/product");
const jwt = require("jsonwebtoken");

const calculation = async (items) => {
  const item_ids = items.map((item) => [item.id, item.quantity,item.size]);
  console.log(item_ids);
  let total = 0;
  for (value of item_ids) {
    const product = await Product.findById(value[0]);
   
    switch (value[2]) {
      case 's':
        product.quantity[0]-=value[1];
        console.log('itemRemoved')
        break;
        
        case 'm':
          product.quantity[1]-=value[1];
          console.log('itemRemoved')
        break;

        case 'l':
        product.quantity[2]-=value[1];
        break;
    
      default:
        break;
    }

    console.log(product.price, value[1], product.price * value[1]);

    total += product.price * value[1];
    product.save()
  }
  console.log(total);
  return total;
};

const placeOrder = async (req, res) => {
  try {
    const { userId, cartdata, formData } = req.body;
    console.log(formData);
    const amount = await calculation(cartdata);
    const date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;

    let orderItems = new Order({
      orderDate: date,
      orderAmount: amount + formData.deliveryCharges,
      shippingAmount: Number.parseFloat(formData.deliveryCharges),
      orderItems: cartdata.map((item) => ({
        ...item,
        isProductreviewed: false,
      })),
      userId: userId,
      deliveryInfo: formData,
    });
    orderItems = await orderItems.save();
    const orderId = orderItems._id.toString();

    console.log({ orderId });
    console.log(70 * 100 + Number.parseFloat(formData.deliveryCharges));

    res.json({
      status: "success",
      orderId: orderId,
    });
  } catch (error) {
    res.json({
      status: "error",
      
      
      error:error.message
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // const token=req.cookies.adminToken
    const orders = await Order.find();
    // jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
    //   if(err){
    //     throw new Error("Corrupted Token")
    //   }
    //   else{

    res.json({ status: "success", orders: orders });
    // }
    // })
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: error.message });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    // const orderId = req.params.id;
    const orderId = req.params.id;
    const orderStatus = req.body.orderStatus;

    const updateOrder = await Order.findByIdAndUpdate(
      `${orderId}`,
      { $set: { orderStatus: orderStatus } },
      { new: true }
    );
    res.json({ status: updateOrder.orderStatus });
  } catch (error) {
    res.json({ error: error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const orders = await Order.find({ userId: userId });
    res.json({ orders: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    res.json({ orderDetails: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const getDeliveredOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const deliveredOrders = await Order.find({
      $and: [{ orderStatus: "delivered" }, { userId: userId }],
    });

    //To filter out all the orders that has already been reviewed

    const reviewOrders = deliveredOrders.filter((orderDetails) => {
      return orderDetails.orderItems.some(
        (item) => item.isProductreviewed !== true
      );
    });

    res.json({ deliveredOrders: reviewOrders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const checkProductPurchase = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    console.log(orderId);
    const order = await Order.findById(orderId);

    const isOrder = order.orderItems.find((e) => e.id === productId);

    res.json({ order: isOrder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const addReview = async (req, res) => {
  try {
    const { productId, orderId, userId, currentRating, reviewMsg } = req.body;
    console.log(productId, orderId, userId, currentRating, reviewMsg);
    const order = await Order.findOne({
      $and: [{ _id: orderId }, { userId: userId }],
    });
    if (order) {
      let index = order.orderItems.findIndex((obj) => obj.id === productId);
      order.orderItems[index] = {
        ...order.orderItems[index],
        isProductreviewed: true,
      };
      await order.save();
      console.log("teeest");

      const product = await Product.findById(productId);
      const { rating, reviewers, notes } = product.reviews;

      product.reviews = {
        ...product.reviews,
        reviewers: reviewers + 1,
        rating: (rating * reviewers + currentRating) / (reviewers + 1),
        notes: [...notes, reviewMsg],
      };
      await product.save();
    } else {
      // console.log('teeest')
    }

    res.json({
      productId: productId,
      orderId: orderId,
      userId: userId,
      order: order,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error, status: "error" });
  }
};

module.exports = {
  getUserOrders,
  getOrderDetails,
  getDeliveredOrderDetails,
  checkProductPurchase,
  addReview,
  getAllOrders,
  changeOrderStatus,
  placeOrder,
};
