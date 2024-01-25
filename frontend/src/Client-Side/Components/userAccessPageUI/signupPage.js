import React from "react";
import { useContext, useEffect, useState } from "react";
import "../loginform.css";
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { loginFormSchema } from "../../formSchemas/loginForm";
import { useFormik } from "formik";

function SignupPage({ setError, isSignup, error, setIssignup, cartdata }) {
  const [signUpDetails, setSignUpDetails] = useState({});

  const createUserAccount = async (userdata) => {
    console.log({ userdata });
    try {
      const updatedCart = cartdata.map((item) => {
        return {
          product_id: item.id,
          quantity: item.quantity,
        };
      });
      const response = await fetch(
        "https://trend-flare-apparel-store-api.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type for JSON data
          },

          body: JSON.stringify({ ...userdata, cart: updatedCart }),
        }
      );

      const data = await response.json();
      console.log("response..........", data);

      if (!response.ok) {
        // alert(data.message);
        setError([true, `✕  ${data.message}`]);
      } else {
        setIssignup(false);
        setError([false, ""]);
        alert("Account Succesfully created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginFormSchema,
      onSubmit: (values) => {
        console.log(values);

        createUserAccount(values);
      },
    });

  return (
    <div
      style={!isSignup ? { height: "40%", marginTop: "13%" } : {}}
      id="inputfields"
    >
      <div className="inputfield" id="fullName">
        <BsTelephoneFill
          size={"16px"}
          color="grey"
          style={{ position: "absolute", left: "15px", top: "12px" }}
        />
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fullName}
          placeholder="Full Name"
          type=""
          name="fullName"
          style={
            errors.fullName && touched.fullName && { border: "1px solid red" }
          }
        />
        {errors.fullName && touched.fullName ? (
          <span style={{ color: "red", fontSize: "14px", paddingLeft: "5px" }}>
            {errors.fullName}
          </span>
        ) : null}
      </div>
      <div className="inputfield" id="username">
        <BiSolidUser
          size={"20px"}
          color="grey"
          style={{ position: "absolute", left: "14px", top: "12px" }}
        />

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          placeholder="Username"
          type="text"
          name="username"
          style={
            errors.username && touched.username && { border: "1px solid red" }
          }
        />
        {errors.username && touched.username ? (
          <span style={{ color: "red", fontSize: "14px", paddingLeft: "5px" }}>
            {errors.username}
          </span>
        ) : null}
      </div>

      <div className="inputfield" id="contact">
        <BsTelephoneFill
          size={"16px"}
          color="grey"
          style={{ position: "absolute", left: "15px", top: "12px" }}
        />
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          placeholder="Phone Number"
          type="number"
          name="phone"
          style={errors.phone && touched.phone && { border: "1px solid red" }}
        />
        {errors.phone && touched.phone ? (
          <span style={{ color: "red", fontSize: "14px", paddingLeft: "5px" }}>
            {errors.phone}
          </span>
        ) : null}
      </div>

      <div className="inputfield" id="email">
        <MdEmail
          size={"18px"}
          color="grey"
          style={{ position: "absolute", left: "15px", top: "12px" }}
        />

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="E-mail"
          type="email"
          name="email"
          style={errors.email && touched.email && { border: "1px solid red" }}
        />
        {errors.email && touched.email ? (
          <span style={{ color: "red", fontSize: "14px", paddingLeft: "5px" }}>
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="inputfield" id="password">
        <FaLock
          size={"16px"}
          color="grey"
          style={{ position: "absolute", left: "15px", top: "12px" }}
        />
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          placeholder="Password"
          type="password"
          name="password"
          style={
            errors.password && touched.password && { border: "1px solid red" }
          }
        />
        {errors.password && touched.password ? (
          <span style={{ color: "red", fontSize: "14px", paddingLeft: "5px" }}>
            {errors.password}
          </span>
        ) : null}
      </div>

      {error[0] && (
        <div className="inputfield" style={{ color: "red", height: " 45px" }}>
          {error[1]}
        </div>
      )}
      <button onClick={handleSubmit} type="submit" id="submit_btn">
        Sign Up
      </button>
      <p>
        or ,{" "}
        <button
          style={{
            backgroundColor: "transparent",
            border: "0px",
            fontSize: "large",
            color: "blueviolet",
          }}
          onClick={() => {
            setIssignup(!isSignup);
            setError([false, ""]);
            console.log(isSignup);
          }}
        >
          Log In
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
