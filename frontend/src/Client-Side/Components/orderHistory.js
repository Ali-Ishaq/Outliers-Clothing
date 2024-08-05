import React, { useState, useContext, useEffect } from "react";
import "./orderHistory.css";
import { userContext } from "../Contexts/userContext";
import { Navigate, useNavigate } from "react-router-dom";

function OrderHistory() {
  const { userProfile, isUserLogged } = useContext(userContext);

  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogged) {
      const getOrdersfromDB = async () => {
        try {
          const response = await fetch(
            `https://outliers-clothing-api.vercel.app/orders/getUserOrders/${userProfile._id}`
          );
          const { orders } = await response.json();
          console.log(orders);
          setOrders(orders);
        } catch (error) {
          console.log({ error });
        }
      };

      getOrdersfromDB();
    }
    console.log(isUserLogged);
  }, []);

  return (
    <>
      {orders !== null ? (
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

          {orders.length > 0 ? (
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
                          navigate(`/orders/${item._id}`);
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
      ) : (
        <div className="defautloader-container">
          <div class="defautloader"></div>
        </div>
      )}
    </>
  );
}

export default OrderHistory;
