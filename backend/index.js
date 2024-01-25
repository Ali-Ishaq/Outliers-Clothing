const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRouter");
const webhookRouter = require("./routes/webhookRouter");
const orderRouter = require("./routes/orderRoute");
const cartRouter = require("./routes/cartRoute");
const middlewareWrapper = require("cors");

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const app = express();

// Middlewares
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(
  cors({
    origin: [

      "https://trend-flare-apparel-store.vercel.app",
      "http://192.168.0.129:3001"
      
    ],
    credentials: true,
  })
);

app.use(cookieParser());

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is up and running on Port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send(`Server is up and running on Port: ${PORT}`);
});

app.use("/products", productRouter.route);
// app.use("/users", userRouter.route);
app.use("/users", userRouter.route);
app.use("/webhook", webhookRouter.route);
app.use("/orders", orderRouter.route);
app.use("/cart", cartRouter.route);
