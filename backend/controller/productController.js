const Product = require("../model/product");
const Order = require("../model/orders");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getAllProduct = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });

    res.json({
      status: "success",
      fetchedProducts: products,
    });
  } catch (error) {
    res.json({
      status: "error",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json({
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Invalid ID",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    let newProduct = new Product(req.body);
    newProduct = await newProduct.save();

    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ status: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      status: "success",
      updateProduct: updatedProduct,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
};

const stripePaymentUrl = async (req, res) => {
  try {
    const ids = req.body.map((i) => i.id);
    const products = await Product.find({ _id: { $in: ids } });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((item, index) => {
        let quantity = req.body[index].quantity;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: quantity,
        };
      }),

      success_url: "http://192.168.0.129:3001/",
      cancel_url: "http://192.168.0.129:3001/",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const calculation = async (items) => {
  const item_ids = items.map((item) => [item.id, item.quantity]);
  console.log(item_ids);
  let total = 0;
  for (value of item_ids) {
    const product = await Product.findById(value[0]);
    console.log(product.price, value[1], product.price * value[1]);

    total += product.price * value[1];
  }
  console.log(total);
  return total;
};

const payment_intent = async (req, res) => {
  const { userId, cartdata, formData } = req.body;
  const amount = await calculation(cartdata);
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  let orderItems = new Order({
    orderDate: date,
    orderAmount: amount + formData.deliveryCharges,
    shippingAmount: Number.parseFloat(formData.deliveryCharges),
    orderItems: cartdata.map((item) => ({ ...item, isProductreviewed: false })),
    userId: userId,
    deliveryInfo: formData,
  });
  orderItems = await orderItems.save();
  const orderId = orderItems._id.toString();
  console.log({ orderId });
  console.log(70 * 100 + Number.parseFloat(formData.deliveryCharges));

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100 + Number.parseFloat(formData.deliveryCharges) * 100,
      currency: "usd",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      metadata: {
        userId: userId,
        orderId: orderId,
      },
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProduct,
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  stripePaymentUrl,
  payment_intent,
};
