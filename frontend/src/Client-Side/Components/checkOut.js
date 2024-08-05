import React, { useState, useEffect, useContext, useRef } from "react";
import "./checkOut.css";
import { userContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { billingAddressSchema } from "../formSchemas/index";
import { hooksContext } from "../Contexts/hooksContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function CheckOut({ cartdata, carttotal }) {
  const [orderSummaryVisibility, setOrderSummaryVisibility] = useState(false);
  const [placeOrderBtnState, setPlaceOrderBtnState] = useState(false);
  const [orderApiResponse, setOrderApiResponse] = useState(null);
  const { setOverlayVisibility } = useContext(hooksContext);

  console.log(cartdata, carttotal);
  let formData = {};
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const navigate = useNavigate();
  const saveAddressBtn = useRef("");
  const loadPaymentIntentBtn = useRef("");
  const checkOutDetailSection = useRef("");
  const orderOverviewRef = useRef(null);
  const arrowRef = useRef(null);
  const orderConfirmationRef = useRef(null);

  const { userProfile } = useContext(userContext);
  // const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // setOverlayVisibility(true)

    return () => {
      setOverlayVisibility(false);
    };
  }, []);

  let requestBody = {
    cartdata: cartdata,
    userId: userProfile ? userProfile._id : "guest",
    formData: formData,
  };
  console.log(cartdata);

  const initialValues = {
    firstname: "",
    lastName: "",
    streetAddress: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    zip: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: billingAddressSchema,
      onSubmit: (values) => {
        setDeliveryCharges(true);

        formData = {
          ...formData,
          ...values,
          deliveryCharges: deliveryCharges,
        };

        requestBody = { ...requestBody, formData: formData };

        placeOrder();
        saveAddressBtn.current.style.backgroundColor =
          "rgba(38, 216, 38, 0.747)";
      },
    });

  // console.log(formData, formData != null);

  const placeOrder = async () => {
    console.log(requestBody);

    orderConfirmationRef.current.style.display = "flex";
    setOverlayVisibility(true);

    // Create PaymentIntent as soon as the page loads
    fetch("https://outliers-clothing-api.vercel.app/orders/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderApiResponse(data);
        setPlaceOrderBtnState(false);
      });
  };

  const handleOrderSummaryVisibility = (e) => {
    console.log(e.target);

    if (orderSummaryVisibility) {
      e.stopPropagation();
      arrowRef.current.style.transform = "rotateZ(0deg)";
      console.log("if");
      orderOverviewRef.current.style.display = "";
      orderOverviewRef.current.style.height = "";
    } else {
      arrowRef.current.style.transform = "rotateZ(180deg)";
      orderOverviewRef.current.style.display = "flex";
      orderOverviewRef.current.style.height = "auto";
      console.log("else");
    }
    setOrderSummaryVisibility(!orderSummaryVisibility);
  };

  return (
    <>
      <div id="CheckOutPage">
        <div className="order-summary-expandable-drawer">
          <h1>{` Rs ${carttotal + deliveryCharges}`}</h1>

          <button
            className="orderVisibilitybtn"
            onClick={handleOrderSummaryVisibility}
          >
            <svg
              ref={arrowRef}
              focusable="false"
              width="12"
              height="8"
              class="icon icon--chevron icon--inline  "
              viewBox="0 0 12 8"
            >
              <path
                fill="none"
                d="M1 1l5 5 5-5"
                stroke="currentColor"
                stroke-width="2"
              ></path>
            </svg>
          </button>
        </div>

        <div id="checkOutDetails" ref={checkOutDetailSection}>
          <h1>Billing Address</h1>
          <form action="">
            <div
              className="inputdivs"
              style={{ width: "50%", display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="firstname">First Name </label>
              <input
                style={
                  errors.firstname &&
                  touched.firstname && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                id="firstname"
                name="firstname"
                type="text"
                value={values.firstname}
              />
              {errors.firstname && touched.firstname ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.firstname}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{
                paddingLeft: "0px",
                width: "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="LastName">Last Name </label>
              <input
                style={
                  errors.lastName &&
                  touched.lastName && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={values.lastName}
              />
              {errors.lastName && touched.lastName ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.lastName}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="streetAddress">Street Address </label>
              <input
                style={
                  errors.streetAddress &&
                  touched.streetAddress && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                id="streetAddress"
                placeholder="Street Address"
                type="text"
                name="streetAddress"
                value={values.streetAddress}
              />
              {errors.streetAddress && touched.streetAddress ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.streetAddress}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{ width: "50%", display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="Country">Country </label>
              <input
                style={
                  errors.country &&
                  touched.country && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                id="Country"
                name="country"
                placeholder="Country"
                type="text"
                value={values.country}
              />
              {errors.country && touched.country ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.country}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{
                paddingLeft: "0px",
                width: "30%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="City">City </label>
              <input
                style={
                  errors.city && touched.city && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                id="City"
                name="city"
                placeholder="City"
                type="text"
                value={values.city}
              />
              {errors.city && touched.city ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.city}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{
                paddingLeft: "0px",
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="zip">Zip</label>
              <input
                style={errors.zip && touched.zip && { border: "1px solid red" }}
                onChange={handleChange}
                onBlur={handleBlur}
                id="zip"
                name="zip"
                placeholder="Zip"
                type="number"
                value={values.zip}
              />
              {errors.zip && touched.zip ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.zip}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{ width: "50%", display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="phone">Phone </label>
              <input
                style={
                  errors.phone && touched.phone && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                id="phone"
                name="phone"
                placeholder="Phone"
                type="number"
                value={values.phone}
              />
              {errors.phone && touched.phone ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.phone}
                </span>
              ) : null}
            </div>

            <div
              className="inputdivs"
              style={{
                paddingLeft: "0px",
                width: "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="email">Email </label>
              <input
                style={
                  errors.email && touched.email && { border: "1px solid red" }
                }
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={values.email}
              />
              {errors.email && touched.email ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "400",
                    paddingLeft: "5px",
                  }}
                >
                  {errors.email}
                </span>
              ) : null}
            </div>
          </form>
          <div id="deliveryOptions">
            <div className="deliveryOption">
              <div className="deliveryPrice">
                <h2>Free</h2>
              </div>
              <div className="deliveryDetails">
                <p id="p1"> Standard Shipping</p>
                <p id="p2">( 4-5 Business Days )</p>
                <p id="p3">
                  Please note : this service is not available for P.O. boxes
                </p>
              </div>

              <div className="deliveryCheck">
                <input
                  name="deliveryCharges"
                  value="0"
                  type="radio"
                  onChange={(e) => {
                    setDeliveryCharges(Number.parseInt(e.target.value));
                  }}
                  defaultChecked
                />
              </div>
            </div>

            <div className="deliveryOption">
              <div className="deliveryPrice">
                <h2>Rs 199</h2>
              </div>
              <div className="deliveryDetails">
                <p id="p1">Express Shipping</p>
                <p id="p2">( 1-2 Business Days )</p>
                <p id="p3">
                  Please note : this service is not available for P.O. boxes
                </p>
              </div>

              <div className="deliveryCheck">
                <input
                  id="expressShipping"
                  name="deliveryCharges"
                  value="199"
                  type="radio"
                  onChange={(e) => {
                    setDeliveryCharges(Number.parseFloat(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            id="saveAddres"
            ref={saveAddressBtn}
            disabled={placeOrderBtnState}
          >
            Place Order
          </button>
        </div>

        <div id="orderOverview" ref={orderOverviewRef}>
          <h1
            style={{
              fontWeight: "400",
              fontSize: "20px",
              paddingBottom: "15px",
            }}
            className="orderOverview-main-heading"
          >
            Order Summary
          </h1>
          <div id="orderCartView">
            {cartdata.map((e) => (
              <div
                style={{
                  height: "80px",
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",

                  alignItems: "center",
                  padding: "5px",
                  margin: "3% 0 ",
                  // backgroundColor: "rgb(230, 248, 255)",
                  backgroundColor: "white",
                }}
              >
                <div
                  id="orderCartViewImg"
                  style={{
                    height: "100%",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={e.CartImg} alt="" style={{ width: "100%" }} />
                </div>

                <div
                  id="orderCartViewTitle"
                  style={{
                    width: "65%",
                    paddingLeft: "15px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "15px",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontWeight: "400",
                    }}
                  >
                    {e.CartName}
                  </h1>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "gray",
                      fontWeight: "400",
                    }}
                  >
                    size: {e.size.toUpperCase()}
                  </p>

                  <p style={{ fontSize: "small", color: "gray" }}>
                    Qty : {e.quantity}
                  </p>
                </div>

                <div
                  id="orderCartViewPrice"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "25%",
                  }}
                >
                  <h1 style={{ fontSize: "16px", fontWeight: "400" }}>
                    Rs {e.CartPrice * e.quantity}
                  </h1>
                  {e.quantity > 1 && (
                    <p
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        color: "gray",
                      }}
                    >
                      {e.CartPrice}
                    </p>
                  )}
                </div>
                {/* <h1 id="subtotal">${quantity * e.CartPrice}</h1> */}
              </div>
            ))}
          </div>
          <div className="promo-code-container">
            <input
              placeholder="Discount Code or gift card"
              name="discountCode"
              type="text"
            />
            <button> Apply</button>
          </div>
          <div id="orderCalculation">
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="calcultion"
            >
              <p>Subtotal :</p>
              <p
                className="calcprices"
                style={{ fontSize: "16px", fontWeight: "400" }}
              >{`  ${carttotal}`}</p>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="calcultion"
            >
              <p>Shipping :</p>
              <p
                className="calcprices"
                style={{ fontSize: "16px", fontWeight: "400" }}
              >
                {deliveryCharges === 0 ? "Free" : ` ${deliveryCharges}`}
              </p>
            </div>
          </div>
          <div id="dueAmount">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
              className="calculation"
            >
              <p style={{ fontSize: "22px", fontWeight: "500" }}>Total :</p>
              <p
                className="calcsubprice"
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                }}
              >{` Rs ${carttotal + deliveryCharges}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="order-processing-window"
        style={{ display: "none" }}
        ref={orderConfirmationRef}
      >
        {orderApiResponse != null ? (
          <>
            <img src="orderComplete.png" alt="" />
            <h1>Order Confirmed</h1>
            <h2>
              Your Order Number is{" "}
              {orderApiResponse.orderId.slice(-7).toUpperCase()}{" "}
            </h2>
            <p>
              We are getting started on your order right away, and you will
              receive an order confirmation email shortly. In the meantime,
              explore our latest collection and get inspired by new trends.{" "}
            </p>
            <button> Explore More</button>
            <a href="#">Read about our return policy</a>
          </>
        ) : (
          <div class="defautloader"></div>
        )}
      </div>
    </>
  );
}
