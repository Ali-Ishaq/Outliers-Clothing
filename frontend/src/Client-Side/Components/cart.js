// import Cartdata from "../Datafiles/cartdata";
import CartUI from "./cartUI";
import "./cart.css";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Contexts/userContext";

function Cart({ clearCart, carttotal, cartdata }) {
  
  const navigate = useNavigate();
  const { isUserLogged } = useContext(userContext);

  const handleCheckOut = () => {
    if (!isUserLogged) {
      navigate("/loginform");
    }
    if (cartdata.length >= 1 && isUserLogged) {
      navigate("/checkout");
    }
  };



  return (
    <div  id="cart-section">
      <div id="cartlayout">
        <span  className="item-heading">Items</span>
        <span className="headings">Quantity</span>
        <span className="headings">Subtotal</span>
        <span className="headings">Remove</span>
      </div>
      <div id="cartitems-section">
        {cartdata.length !== 0 ? (
          cartdata.map((value, index) => (
            <CartUI
              quantity={value.quantity}
              key={index}
              UniqueId={value.id}
              CartImg={value.CartImg}
              CartName={value.CartName}
              CartPrice={value.CartPrice}
              // totalammount={totalammount}
            ></CartUI>
          ))
        ) : (
          <div id="empty-cart">Your Cart is Empty</div>
        )}
      </div>
      <div id="subtotal">
        <div id="firstChild">
          <button id="checkoutbtn" onClick={handleCheckOut}>
            {isUserLogged === true ? "Check Out" : "Log In to Check Out"}
          </button>
        </div>

        <div>Total</div>
        <div>$ {carttotal}</div>
        <div id="lastChild">
          <button id="clearCartbtn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
