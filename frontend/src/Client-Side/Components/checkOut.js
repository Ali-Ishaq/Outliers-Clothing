import React, { useState, useEffect, useContext, useRef } from "react";
import "./checkOut.css";
import { userContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { billingAddressSchema } from "../formSchemas/index";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


export default function CheckOut({ cartdata, carttotal }) {
  console.log(cartdata,carttotal);
  let formData ={};
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const navigate = useNavigate();
  const saveAddressBtn = useRef("");
  const loadPaymentIntentBtn = useRef("");
  const checkOutDetailSection = useRef("");

  const { userProfile } = useContext(userContext);
  // const [clientSecret, setClientSecret] = useState("");
  let requestBody = {
    cartdata: cartdata,
    userId: userProfile?userProfile._id:"guest",
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

        formData={
          ...formData,
          ...values,
          deliveryCharges: deliveryCharges,
        };

        requestBody={...requestBody,formData:formData}


        
        placeOrder();
        saveAddressBtn.current.style.backgroundColor =
          "rgba(38, 216, 38, 0.747)";
        
      },
    });

  // console.log(formData, formData != null);
  
  const placeOrder = async() => {
    console.log(requestBody);
   
    // Create PaymentIntent as soon as the page loads
    fetch("http://192.168.0.129:3000/orders/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  // const formChangeHandle = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   console.log({formData});
  // };

  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

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
                style={{ width: "70%", paddingLeft: "15px",height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-around' }}
              >
                <h1
                  style={{
                    fontSize: "15px",
                    
                    fontWeight: "400",
                  }}
                >
                  {e.CartName}
                 

                </h1>
                  <p style={{
                    fontSize: "14px",
                    color: "gray",
                    fontWeight: "400",
                  }}>size: {(e.size).toUpperCase()}</p>
                
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
              checkOutDetailSection.current.scrollIntoView({ behavior: 'smooth' });
            }}
            id="continueShopping"
          >
            Continue
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: "52%",
              maxWidth: "58%",
              alignItems: "center",
            }}
            className="calculation"
          >
            <p style={{ fontSize: "17px", fontWeight: "400" }}>Due Amount :</p>
            <p
              className="calcsubprice"
              style={{
                fontSize: "22px",
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
          Place Order
        </button>
      </div>

      
    </div>
  );
}
