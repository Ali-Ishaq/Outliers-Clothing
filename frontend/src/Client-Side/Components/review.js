import React, { useContext, useEffect, useRef, useState } from "react";
import "./review.css";
import { userContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";

function Review() {
  const { userProfile, isUserLogged } = useContext(userContext);
  const [deliveredOrders, setDeliveredOrders] = useState(null);
  const navigate = useNavigate();

  const myRef = useRef();

  useEffect(() => {
    if (isUserLogged) {
      const getOrdersfromDB = async () => {
        try {
          const response = await fetch(
            `https://trend-flare-apparel-store-api.vercel.app/orders/deliveredOrders/${userProfile._id}`
          );
          const { deliveredOrders } = await response.json();
          console.log(deliveredOrders);
          setDeliveredOrders(deliveredOrders);
        } catch (error) {
          console.log({ error });
        }
      };

      getOrdersfromDB();
    }
    console.log(isUserLogged);
  }, []);
  console.log(deliveredOrders);
  return (
    <div id="reviewComponent">
      {deliveredOrders &&
        deliveredOrders.map((order, index) => {
          return (
            <div key={index} id="reviewContainer">
              <div
                id="orderName"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ marginBottom: "10px" }}>ID : {order._id}</p>
                <p>Purchased on : {order.orderDate}</p>
              </div>
              <div
                style={{
                  paddingBottom: " 20px",
                  borderTop:
                    window.visualViewport.width < 455
                      ? "1px solid lightgray"
                      : "2px solid lightgray",
                }}
              >
                {order.orderItems.map((item, index) => {
                  return item.isProductreviewed === true ? null : (
                    <div
                      key={index}
                      style={{
                        height:
                          window.visualViewport.width < 455 ? "80px" : "110px",
                        width: "100%",
                        display: "flex",
                        overflow: "hidden",

                        alignItems: "center",
                        padding:
                          window.visualViewport.width < 455
                            ? "12px 5px"
                            : "15px 5px",
                        margin: "0 ",
                        marginTop: "0px",

                        borderBottom:
                          window.visualViewport.width < 455
                            ? "1px solid lightgray"
                            : "2px solid lightgray",
                        // paddingBottom:'20px',
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          height: "100%",
                          width:
                            window.visualViewport.width < 455 ? "18%" : "15%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={item.CartImg}
                          alt=""
                        />
                      </div>

                      <div
                        style={{
                          width:
                            window.visualViewport.width < 455 ? "60%" : "60%",
                          paddingLeft: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "15px",
                            marginBottom: "6px",
                            fontWeight: "400",
                          }}
                        >
                          {item.CartName}
                        </h1>
                        <p style={{ fontSize: "small", color: "gray" }}>
                          Qty : {item.quantity}
                        </p>
                      </div>

                      <div
                        style={{
                          width:
                            window.visualViewport.width < 455 ? "22%" : "25%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            navigate(`/review/${order._id}/${item.id}`);
                            console.log("orderId;;;;;;", order._id);
                          }}
                          id="addReviewBtn"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Review;
