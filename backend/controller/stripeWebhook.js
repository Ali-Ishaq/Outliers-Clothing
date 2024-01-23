const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../model/user");
const Order = require("../model/orders");

const endpointSecret =
  "whsec_c173373b070b7bc0629568eeb9567376b6e7669b8ff927e00f78c5054dfd42c4";

const stripeWebhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  //Verification
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("webhook verified  ");
    // console.log("metadata : ", event.data.object.metadata);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(`webhook Error :${err.message}`);
    return;
  }

  //   Handle the event
  const orderId = event.data.object.metadata.orderId;
  const paymentIntentId = event.data.object.id;

  switch (event.type) {
    case "payment_intent.succeeded":
      const userId = event.data.object.metadata.userId;
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" ,orderStatus:'received'});
      
      // await Order.deleteMany({ paymentStatus: "pending" })

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case "payment_intent.created":
      setTimeout(async () => {
       

          stripe.paymentIntents.cancel(paymentIntentId,(err, canceledIntent) => {
              if (err) {
                console.log('payment Intent has not been Deleted');
              } else {
                console.log("Payment Intent has been deleted");
              }
            }
          );
      

        await Order.findOneAndDelete({
          $and: [{ _id: orderId }, { paymentStatus: "pending" }],
        });

        
      }, 180000);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send().end;
};

module.exports = {
  stripeWebhook,
};
