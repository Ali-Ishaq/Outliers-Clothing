import { useEffect, useReducer, useState, useRef } from "react";
import "./ClientSide.css";
import Cart from "./Components/cart";
import Header from "./Components/header";
import Products from "./Components/products";
import Cartdata from "./Datafiles/cartdata";
import ShoesData from "./Datafiles/shoesData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductCard from "./Components/Productcard";
import Loginform from "./Components/loginform";
import useCounter from "./Components/customCounterhook";
import { dispatchContext } from "./Contexts/dispatchContext";
import { userContext } from "./Contexts/userContext";
import { hooksContext } from "./Contexts/hooksContext";
import CheckOut from "./Components/checkOut";
import OrderHistory from "./Components/orderHistory";
import OrderDetails from "./Components/orderDetails";
import Review from "./Components/review";
import AddReview from "./Components/addReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./Components/HomePage";
import OverlayComp from "./Components/overlay";

function ClientSide() {
  const [productsDb, setProductsDb] = useState([]);
  const [carttotal, setCarttotal] = useState(0);

  const [userProfile, setUserProfile] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(null);

  const [overlayVisibility, setOverlayVisibility] = useState(false);
  const cartRef = useRef(null);

  const logOutFunction = () => {};

  const [productPageId, setProductPageId] = useState();
  const [showmsg, setshowmsg] = useState([false, ""]);

  const toastNotification = (msg) => {
    toast(msg);
  };

  const cartReducer = (cartdata, action) => {
    switch (action.type) {
      case "updateCart":
        // console.log(cartdata[0].size)
        let img = action.payload.img;
        let name = action.payload.name;
        let price = action.payload.price;
        let productcode = action.payload.id;
        let size = action.payload.size;

        let newcartitem = {
          CartImg: img,
          CartName: name,
          CartPrice: price,
          id: productcode,
          productcode: productcode,
          quantity: 1,
          size: size,
        };

        console.log(newcartitem);
        console.log(!cartdata.some((p) => p.id == action.payload.id));

        if (
          !cartdata.some(
            (p) => p.id == action.payload.id && p.size == action.payload.size
          )
        ) {
          console.log("heyy");
          toastNotification("Added to Cart");
          console.log(cartdata);
          return [...cartdata, newcartitem];
        } else if (
          cartdata.some(
            (p) => p.id == action.payload.id && p.size == action.payload.size
          )
        ) {
          toastNotification("Quantity Adjusted");

          const index1 = cartdata.findIndex(
            (obj) =>
              obj.id === action.payload.id && obj.size === action.payload.size
          );

          const updatedquantity = cartdata.map((obj, index) =>
            index === index1 ? { ...obj, quantity: obj.quantity + 1 } : obj
          );

          return updatedquantity;
        }

        break;

      case "clearCart":
        setCarttotal(0);
        return cartdata.filter((value) => value.id === "a");

      case "removeCartItem":
        if (cartdata.length === 1) {
          setCarttotal(0);
        }
        return cartdata.filter(
          (value) =>
            !(
              value.id == action.payload.UniqueId &&
              value.size == action.payload.size
            )
        );

      case "decreaseCartQuantity":
        return cartdata.map((obj, index) =>
          obj.id === action.payload.UniqueId && obj.size == action.payload.size
            ? {
                ...obj,
                quantity: obj.quantity > 1 ? obj.quantity - 1 : obj.quantity,
              }
            : obj
        );

      case "increaseCartQuantity":
        return cartdata.map((obj, index) =>
          obj.id === action.payload.UniqueId && obj.size == action.payload.size
            ? { ...obj, quantity: obj.quantity + 1 }
            : obj
        );

      case "userCartDB":
        return action.payload;
      default:
        return cartdata;
    }
  };

  const [cartdata, cartDispatch] = useReducer(cartReducer, Cartdata);

  useEffect(() => {
    if (isUserLogged) {
      try {
        const updateCartOnDb = async () => {
          const updatedCart = cartdata.map((item) => {
            return {
              product_id: item.id,
              quantity: item.quantity,
              size: item.size,
            };
          });

          console.log("fetching.....");
          const response = await fetch(
            `https://outliers-clothing-api.vercel.app/cart/updatecart`,
            {
              method: "POST",
              body: JSON.stringify(updatedCart),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
        };
        updateCartOnDb();
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [cartdata]);

  useEffect(() => {
    try {
      const checkAuth = async () => {
        const response = await fetch(
          "https://outliers-clothing-api.vercel.app/users/checkAuth",
          {
            credentials: "include",
          }
        );
        const { user, cart } = await response.json();

        if (response.status === 200) {
          // console.log(data.user)

          cartDispatch({ type: "userCartDB", payload: cart });
          setIsUserLogged(true);
          setUserProfile(user);
          console.log(user);
        } else {
          console.log("not Authorizeddddd");
          setIsUserLogged(false);
        }
      };
      checkAuth();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function clearCart() {
    cartDispatch({ type: "clearCart" });
  }

  useEffect(() => {
    const totalprice_Array = cartdata.map(
      (obj) => obj.quantity * obj.CartPrice
    );

    let cartsub = 0;
    for (let i = 0; i <= totalprice_Array.length - 1; i++) {
      setCarttotal((cartsub += totalprice_Array[i]));
    }
  }, [cartdata]);

  return (
    <>
      {isUserLogged != null && (
        <div className="App">
          <dispatchContext.Provider value={{ cartDispatch }}>
            <userContext.Provider
              value={{
                userProfile,
                setUserProfile,
                isUserLogged,
                setIsUserLogged,
                logOutFunction,
              }}
            >
              <hooksContext.Provider
                value={{
                  productPageId,
                  setProductPageId,
                  overlayVisibility,
                  setOverlayVisibility,
                  cartRef,
                }}
              >
                <Header cartlength={cartdata.length}></Header>

                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route
                    exact
                    path="/products/:category"
                    element={<Products productsDb={productsDb}></Products>}
                  />

                  <Route
                    exact
                    path="/checkout"
                    element={
                      <CheckOut
                        cartdata={cartdata}
                        carttotal={carttotal}
                      ></CheckOut>
                    }
                  />

                  <Route
                    path="/productcard/:id"
                    element={
                      <ProductCard productsDb={productsDb}></ProductCard>
                    }
                  />

                  <Route
                    exact
                    path="/loginform"
                    element={
                      <Loginform
                        cartdata={cartdata}
                        // userprevCart={userprevCart}
                      ></Loginform>
                    }
                  />
                  <Route
                    exact
                    path="/orders"
                    element={<OrderHistory></OrderHistory>}
                  />

                  <Route
                    exact
                    path="/orders/:id"
                    element={<OrderDetails></OrderDetails>}
                  />
                  <Route exact path="/review" element={<Review></Review>} />
                  <Route
                    exact
                    path="/review/:orderId/:productId"
                    element={<AddReview></AddReview>}
                  />
                </Routes>
                <OverlayComp />
                <Cart
                  carttotal={carttotal}
                  cartdata={cartdata}
                  clearCart={clearCart}
                ></Cart>
              </hooksContext.Provider>
            </userContext.Provider>
          </dispatchContext.Provider>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default ClientSide;
