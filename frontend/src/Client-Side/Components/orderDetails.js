import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";
import "./loader.css";

function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await fetch(`http://192.168.0.129:3000/orders/${id}`);
      const { orderDetails } = await response.json();
      console.log(orderDetails);
      setOrderDetails(orderDetails);
    };

    getOrderDetails();
  }, []);
  return (
    <>
      {orderDetails !== null ? (
        <div id="orderDetailsComponent">

              <div id="orderItems">
                <h1
                  style={{
                    
                    width:'100%',
                    height:'15%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                >
                  Order Items{" "}
                </h1>
                {orderDetails && (
                  <div id="orderItemsWindow">
                    {orderDetails.orderItems.map((e) => (
                      <div
                        style={{
                          height: "80px",
                          width: "100%",
                          display: "flex",
                          overflow: "hidden",

                          alignItems: "center",
                          padding: "5px",
                          margin: "3% 0 ",
                          backgroundColor: "rgb(230, 248, 255)",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width:
                              window.visualViewport.width < 455 ? "20%" : "15%",
                            overflow: "hidden",
                          }}
                        >
                          <img src={e.CartImg} alt="" />
                        </div>

                        <div
                          style={{
                            width:
                              window.visualViewport.width < 455 ? "60%" : "70%",
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
                            {e.CartName}
                          </h1>
                          <p style={{ fontSize: "small", color: "gray" }}>
                            Qty : {e.quantity}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <h1
                            style={{
                              fontSize:
                                window.visualViewport.width < 455
                                  ? "18px"
                                  : "larger",
                              fontWeight: "400",
                            }}
                          >
                            $ {e.CartPrice * e.quantity}
                          </h1>
                          {e.quantity > 1 && (
                            <p
                              style={{
                                fontSize:
                                  window.visualViewport.width < 455
                                    ? "15px"
                                    : "17px",
                                marginTop: "5px",
                                color: "gray",
                              }}
                            >
                              {e.CartPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {orderDetails && (
                  <div id="orderCalc">
                    <div className="orderCalcChilds">
                      <p>Subtotal :</p>
                      <p
                        style={{
                          fontWeight: "bolder",
                          fontSize:
                            window.visualViewport.width < 455 ? "18px" : "20px",
                        }}
                      >
                        ${" "}
                        {orderDetails.orderAmount -
                          orderDetails.deliveryInfo.deliveryCharges}
                      </p>
                    </div>
                    <div className="orderCalcChilds" style={{}}>
                      <p>Shipping :</p>
                      <p
                        style={{
                          fontWeight: "bolder",
                          fontSize:
                            window.visualViewport.width < 455 ? "18px" : "20px",
                        }}
                      >
                        $ {orderDetails.deliveryInfo.deliveryCharges}
                      </p>
                    </div>
                    <div
                      className="orderCalcChilds"
                      style={{
                        marginTop: "10px",
                        height: "60px",
                        paddingTop: "10px",
                        borderTop: "2px solid lightgray",
                      }}
                    >
                      <p>Paid :</p>
                      <p
                        style={{
                          fontWeight: "bolder",
                          fontSize:
                            window.visualViewport.width < 455 ? "20px" : "25px",
                          color: "rgb(103, 172, 1)",
                        }}
                      >
                        $ {orderDetails.orderAmount}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div id="orderInformation">
                <h1 style={{ 
                  
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              width:'100%',
              height:'15%'

                   }}>Shipping Details</h1>
                {orderDetails && (
                  <div id="orderInformationDetails">
                    <p
                      style={{
                        fontSize: "250%",
                        // marginBottom: "30px",
                        fontWeight: "bold",
                        color: " rgb(97, 203, 245)",
                      }}
                    >
                      {orderDetails.deliveryInfo.firstname}
                      {orderDetails.deliveryInfo.lastName}
                    </p>
                   <span> <p
                      style={{
                        fontSize:
                          window.visualViewport.width < 455 ? "120%" : "120%",
                        // marginBottom: "8px",
                        color: "rgb(56, 55, 55)",
                      }}
                    >
                      0{orderDetails.deliveryInfo.phone}
                    </p>
                    <p
                      style={{
                        fontSize:
                          window.visualViewport.width < 455 ? "120%" : "120%",
                        // marginBottom: "30px",
                        color: "rgb(56, 55, 55)",
                      }}
                    >
                      {orderDetails.deliveryInfo.email}
                    </p>
                    </span>
                    <span>
                    <p
                      style={{
                        fontSize: "120%",
                        // marginBottom: "5px",
                        color: "darkgray",
                      }}
                    >
                      {orderDetails.deliveryInfo.streetAddress},{" "}
                      {orderDetails.deliveryInfo.city}
                    </p>
                    <p
                      style={{
                        fontSize: "120%",
                        // marginBottom: "5px",
                        color: "darkgray",
                      }}
                    >
                      {orderDetails.deliveryInfo.zip}
                    </p>
                    <p style={{ fontSize: "120%", color: "darkgray" }}>
                      {orderDetails.deliveryInfo.country}
                    </p>
                    </span>

                    <span>
                    <p
                      style={{
                        display: "flex",
                        // marginTop: "45px",
                        fontSize: "120%",
                        color: "rgb(56, 55, 55)",
                      }}
                    >
                      Order Date :{" "}
                      <p
                        style={{ marginLeft: "5px", color: "rgb(103, 172, 1)" }}
                      >
                        {" "}
                        {orderDetails.orderDate}
                      </p>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        // marginTop: "8px",
                        fontSize: "120%",
                        color: "rgb(56, 55, 55)",
                      }}
                    >
                      Order Status :{" "}
                      <p
                        style={{ marginLeft: "5px", color: "rgb(103, 172, 1)" }}
                      >
                        {" "}
                        {orderDetails.orderStatus}
                      </p>
                    </p>
                    </span>
                  </div>
                )}
                <div id="orderbtns">
                  <button className="cancel-return-btn">Return</button>
                  <button className="cancel-return-btn">Cancel</button>
                </div>
              </div>
            
          
        </div>
      ) : (
        <div className="defautloader-container">
          <div class="defautloader"></div>
        </div>
      )}
    </>
  );
}

export default OrderDetails;
