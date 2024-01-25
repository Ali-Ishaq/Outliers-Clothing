import "./loginform.css";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext";
import { dispatchContext } from "../Contexts/dispatchContext";
import UserProfilepage from "./userAccessPageUI/userProfilepage.js";
import LoginPage from "./userAccessPageUI/loginPage";
import SignupPage from "./userAccessPageUI/signupPage";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function Loginform({ cartdata, userprevCart }) {
  const [isSignup, setIssignup] = useState(true);
  const [signUpDetails, setSignUpDetails] = useState({});
  const [logInDetails, setLogInDetails] = useState({});
  const [error, setError] = useState([false, ""]);
  const navigate = useNavigate();

  const { userProfile, setUserProfile, isUserLogged, setIsUserLogged } =
    useContext(userContext);

  const { cartDispatch } = useContext(dispatchContext);

  function handleLogIn() {
    let credentials = {
      username: logInDetails.username,
      password: logInDetails.password,
    };

    const findUser = async () => {
      try {
        const response = await fetch(
          "https://trend-flare-apparel-store-api.vercel.app/users/login",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const { status, role, userDetails, cart } = await response.json();

        if (status === "success") {
          if (role === "visitor") {
            cartDispatch({ type: "userCartDB", payload: cart });
            setIsUserLogged(true);
            setUserProfile(userDetails);
            console.log("this is previous cart", userDetails.cart);
            console.log("This is actual cart", cart);
            console.log(userDetails);
          } else {
            navigate("/admin");
          }
        } else {
          setError([true, ` ✕  ${status}`]);
          console.log(status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findUser();
  }

  const handleLogInFormChange = (e) => {
    setLogInDetails({ ...logInDetails, [e.target.name]: e.target.value });
    setError([false, ""]);
  };

  // const initialValues = {
  //   firstname: "",
  //   lastName: "",
  //   streetAddress: "",
  //   country: "",
  //   city: "",
  //   email: "",
  //   phone: "",
  //   zip: "",
  // };

  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: initialValues,
  //     validationSchema: billingAddressSchema,
  //     onSubmit: (values) => {
  //       setFormData({
  //         ...formData,
  //         ...values,
  //         deliveryCharges: deliveryCharges,
  //       });
  //       saveAddressBtn.current.style.backgroundColor =
  //         "rgba(38, 216, 38, 0.747)";
  //       loadPaymentIntentBtn.current.click();
  //     },
  //   });

  return (
    <div id="login_form_parent">
      <div id="login_form">
        <div id="bigimg">
          <img src="https://res.cloudinary.com/drwizlf0y/image/upload/v1706214540/TrendFlare/luis-felipe-lins-LG88A2XgIXY-unsplash_v3s4gk.jpg" alt="" />
        </div>

        {!isUserLogged && (
          <div id="formpart">
            <div
              id="heading"
              style={isSignup === true ? { height: "20%" } : { height: "25%" }}
            >
              {!isUserLogged &&
                (isSignup === true ? <h1>Sign Up</h1> : <h1>Welcome</h1>)}
              {isUserLogged && <h1>Welcome</h1>}
            </div>

            {/* SignUp PAGE Starts Here          */}

            {isSignup && !isUserLogged && (
              <SignupPage
                setError={setError}
                isSignup={isSignup}
                error={error}
                setIssignup={setIssignup}
                cartdata={cartdata}
              ></SignupPage>
            )}
            {!isSignup && !isUserLogged && (
              <div
                style={!isSignup ? { height: "40%", marginTop: "13%" } : {}}
                id="inputfields"
              >
                <div className="inputfield" id="username">
                  <BiSolidUser
                    size={"20px"}
                    color="grey"
                    style={{ position: "absolute", left: "14px", top: "12px" }}
                  />

                  <input
                    onChange={handleLogInFormChange}
                    placeholder="Username"
                    type="text"
                    name="username"
                  />
                </div>

                <div className="inputfield" id="password">
                  <FaLock
                    size={"16px"}
                    color="grey"
                    style={{ position: "absolute", left: "15px", top: "12px" }}
                  />
                  <input
                    onChange={handleLogInFormChange}
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </div>
                {error[0] && (
                  <div
                    className="inputfield"
                    style={{ color: "red", height: " 45px" }}
                  >
                    {error[1]}
                  </div>
                )}

                <button onClick={handleLogIn} id="submit_btn">
                  Log In
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
                    Sign Up
                  </button>
                </p>
              </div>
            )}
            {/* Log In Page Ends here*/}
          </div>
        )}
        {isUserLogged && (
          <div id="formpart">
            <UserProfilepage></UserProfilepage>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loginform;
