import { Formik, useFormik } from "formik";
import React from "react";
import "./adminLogIn.css";
import { logInFormSchema } from "./formSchemas/loginFormSchema";
import { useNavigate } from "react-router-dom";
function AdminLogIn({ setAccess }) {
  const navigate = useNavigate();

  const checkCredentials = async (obj) => {
    const response = await fetch(`http://192.168.0.129:3000/users/adminlogin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    const { status, username } = await response.json();
    if (status === "success") {
      console.log("success");
      setAccess(true);
    } else {
      console.log(status);
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const { handleChange, handleSubmit, errors, handleBlur, values, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: logInFormSchema,
      onSubmit: (values) => {
        checkCredentials(values);
      },
    });

  return (
    <div id="AdminLogIn">
      <form onSubmit={handleSubmit} id="logInForm" action="">
        <div id="username" className="logInFormDivs">
          <p className="loginformHeading">Username</p>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
          />
          {errors.username && touched.username ? (
            <p className="loginformError">{errors.username}</p>
          ) : null}
        </div>

        <div id="password" className="logInFormDivs">
          <p className="loginformHeading">Password</p>
          <input
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
          />
          {errors.password && touched.password ? (
            <p className="loginformError">{errors.password}</p>
          ) : null}
        </div>

        <button type="submit" id="adminLoginSubmit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogIn;
