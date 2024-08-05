import React from "react";
import "./navigationPage.css";
import { useNavigate } from "react-router-dom";

function NavigationPage({ setAccess }) {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    const logOut = async () => {
      const response = await fetch(
        "https://outliers-clothing-api.vercel.app/users/logout/adminToken",
        { credentials: "include" }
      );
    };

    logOut();

    setAccess(false);
    navigate("/");
  };

  return (
    <div id="navigationPage">
      <button
        onClick={() => {
          handleClick("/admin/addproduct");
        }}
        className="navigationPageBtns"
      >
        Add Product
      </button>
      <button
        onClick={() => {
          handleClick("/admin/vieworders");
        }}
        className="navigationPageBtns"
      >
        View Orders
      </button>
      <button
        onClick={() => {
          handleClick("/admin/viewproducts");
        }}
        className="navigationPageBtns"
      >
        View Products
      </button>
      <button
        onClick={() => {
          handleClick("/admin/modifyproduct");
        }}
        className="navigationPageBtns"
      >
        Modify Product
      </button>
      <button onClick={handleLogout} className="navigationPageBtns">
        LogOut
      </button>
    </div>
  );
}

export default NavigationPage;
