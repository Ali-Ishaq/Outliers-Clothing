import React, { useState, useEffect, useContext, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkOutForm";
import "./checkOut.css";
import { userContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { billingAddressSchema } from "../formSchemas/index";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51O1SMOH103GHUfsXm0arUQySPmHI8BU8lsLgoeCpN69kkOl0DT5ONOXL6F6pRpo5bpW5reLTyr8KQDMnH4NCa1il00lPUw89V5"
);

export default function CheckOut({ cartdata, carttotal }) {
  const [formData, setFormData] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const navigate = useNavigate();
  const saveAddressBtn = useRef("");
  const loadPaymentIntentBtn = useRef("");
  const checkOutDetailSection = useRef("");

  const { userProfile } = useContext(userContext);
  const [clientSecret, setClientSecret] = useState("");
  const requestBody = {
    cartdata: cartdata,
    userId: userProfile._id,
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
        setFormData({
          ...formData,
          ...values,
          deliveryCharges: deliveryCharges,
        });
        saveAddressBtn.current.style.backgroundColor =
          "rgba(38, 216, 38, 0.747)";
        loadPaymentIntentBtn.current.click();
      },
    });

  console.log(formData, formData != null);

  const loadPaymentIntent = () => {
    console.log(requestBody);
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://trend-flare-apparel-store-api.vercel.app/products/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  const formChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div id="CheckOutPage">
      <div id="orderOverview">
        <h1>Your Cart</h1>
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
                backgroundColor: "rgb(230, 248, 255)",
              }}
            >
              <div
                id="orderCartViewImg"
                style={{ height: "100%", width: "15%", overflow: "hidden" }}
              >
                <img src={e.CartImg} alt="" />
              </div>

              <div
                id="orderCartViewTitle"
                style={{ width: "70%", paddingLeft: "15px" }}
              >
                <h1
                  style={{
                    fontSize: "15px",
                    marginBottom: "6px",
                    fontWeight: "400",
                  }}
                >
                  {e.CartName}
                </h1>
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
                }}
              >
                <h1 style={{ fontSize: "larger", fontWeight: "400" }}>
                  $ {e.CartPrice * e.quantity}
                </h1>
                {e.quantity > 1 && (
                  <p
                    style={{
                      fontSize: "17px",
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
        <div id="orderCalculation">
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="calcultion"
          >
            <p>Subtotal :</p>
            <p
              className="calcprices"
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            >{` $ ${carttotal}`}</p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="calcultion"
          >
            <p>Shipping :</p>
            <p
              className="calcprices"
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            >
              {deliveryCharges === 0 ? "Free" : `$ ${deliveryCharges}`}
            </p>
          </div>
        </div>
        <div id="dueAmount">
          <button
            onClick={() => {
              navigate("/");
            }}
            id="continueShopping"
          >
            Continue Shopping
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: "52%",
              maxWidth: "52%",
              alignItems: "center",
            }}
            className="calculation"
          >
            <p style={{ fontSize: "17px", fontWeight: "400" }}>Due Amount :</p>
            <p
              className="calcsubprice"
              style={{
                fontSize: "25px",
                fontWeight: "bolder",
                color: "rgb(103, 172, 1)",
              }}
            >{` $ ${carttotal + deliveryCharges}`}</p>
          </div>
        </div>
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
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
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
                errors.country && touched.country && { border: "1px solid red" }
              }
              onChange={handleChange}
              onBlur={handleBlur}
              id="Country"
              name="country"
              placeholder=""
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
              style={errors.city && touched.city && { border: "1px solid red" }}
              onChange={handleChange}
              onBlur={handleBlur}
              id="City"
              name="city"
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
              <h2>$ 3.99</h2>
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
                value="3.99"
                type="radio"
                onChange={(e) => {
                  setDeliveryCharges(Number.parseFloat(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} id="saveAddres" ref={saveAddressBtn}>
          Save Address
        </button>
      </div>

      <div id="checkOutCard">
        <div id="cardform">
          <img id="creditcardImg" src="./creditcard.png" alt="" />
          {!clientSecret && (
            <button
              ref={loadPaymentIntentBtn}
              onClick={(e) => {
                if (formData === null) {
                  saveAddressBtn.current.click();
                  e.target.style.backgroundColor = "red";
                  checkOutDetailSection.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
                if (formData) {
                  loadPaymentIntent();
                  e.target.style.backgroundColor = "rgba(38, 216, 38, 0.747)";
                }
              }}
              id="loadPaymentIntent"
            >
              Add Card Details
            </button>
          )}
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
