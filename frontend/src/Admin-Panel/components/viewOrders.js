import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./viewOrders.css";

function ViewOrders({ acess }) {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrdersfromDB = async () => {
      const response = await fetch(
        `https://trend-flare-apparel-store-api.vercel.app/orders/getAllOrders`,
        {
          credentials: "include",
        }
      );
      const { status, orders, error } = await response.json();

      if (status === "success") {
        console.log(orders);
        setOrders(orders);
      } else {
        console.log(error);
      }
    };

    getOrdersfromDB();
  }, []);

  return (
    <div id="orderHistoryComponent">
      <div id="orderHistoryHeader">
        <div id="orderIdColumn" className="orderHistoryColumns">
          Order ID
        </div>
        <div id="orderDateColumn" className="orderHistoryColumns">
          Date
        </div>
        <div id="orderAmountColumn" className="orderHistoryColumns">
          Amount
        </div>
        <div id="orderStatusColumn" className="orderHistoryColumns">
          Status
        </div>
        <div id="orderViewColumn" className="orderHistoryColumns">
          View
        </div>
      </div>

      {orders ? (
        <>
          {orders.map((item) => {
            return (
              <div className="ordersTemplate">
                <div id="orderId">{item._id}</div>
                <div id="orderDate">{item.orderDate}</div>
                <div id="orderAmount">$ {item.orderAmount}</div>
                <div id="orderStatus">{item.orderStatus}</div>

                <div id="orderView">
                  <button
                    id="orderViewbtn"
                    onClick={() => {
                      navigate(`/admin/vieworders/${item._id}`);
                    }}
                  >
                    View Order
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>No Orders</>
      )}
    </div>
  );
}

export default ViewOrders;
