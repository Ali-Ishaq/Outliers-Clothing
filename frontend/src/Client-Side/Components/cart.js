// import Cartdata from "../Datafiles/cartdata";
import CartUI from "./cartUI";
import {  RxCross1 } from "react-icons/rx";

import "./cart.css";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Contexts/userContext";
import { hooksContext } from "../Contexts/hooksContext";

function Cart({ clearCart, carttotal, cartdata }) {
  
  const {cartRef,setOverlayVisibility}=useContext(hooksContext)
  const navigate = useNavigate();
  const { isUserLogged } = useContext(userContext);

  const handleCheckOut = () => {
     navigate("/checkout");
     setOverlayVisibility(false)
    cartRef.current.style.translate = "100vw";
    
  };



  return (
    <div  id="cart-section" ref={cartRef}>
      <div className="cart-toggle-menu">
        <div className="cart-toggle-menu-cart-size">
          <h1>{cartdata.length} items</h1>
        </div>
        <div className="cart-toggle-menu-cart-close">
          
        <RxCross1
              onClick={() => {
                // cartRef.current.style.display = "none";
                cartRef.current.style.translate = "";
                setOverlayVisibility(false)
              }}
              size="25px"
            />
        </div>
      </div>
      <div className="cartitems-section">
        {cartdata.length !== 0 ? (
          cartdata.map((value, index) => (
            <CartUI
              quantity={value.quantity}
              key={index}
              UniqueId={value.id}
              CartImg={value.CartImg}
              CartName={value.CartName}
              CartPrice={value.CartPrice}
              size={value.size}
              // totalammount={totalammount}
            ></CartUI>
          ))
        ) : (
          <div id="empty-cart">Your Cart is Empty</div>
        )}
      </div>
      <div className="cart-subtotal">
       
          
       
        <div className="cart-subtotal-container">

        <p>Subtotal</p>
        <p>Rs {carttotal}</p>
        </div>

        <button id="checkoutbtn" onClick={handleCheckOut}>
            Check Out
          </button>

       
      </div>
    </div>
  );
}
export default Cart;
