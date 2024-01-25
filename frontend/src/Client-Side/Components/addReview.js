import React, { useContext, useEffect, useRef, useState } from "react";
import "./addReview.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../Contexts/userContext";
import { toast } from "react-toastify";

function AddReview() {
  const { productId, orderId } = useParams();
  const Navigate = useNavigate();
  const { userProfile, isUserLogged } = useContext(userContext);
  const [product, setProduct] = useState(null);
  const ratingPercentage = useRef("");
  const [ratingRemarks, setRatingRemarks] = useState("Excellent");
  const [rating, setRating] = useState(5);
  const [reviewMsg, setReviewMsg] = useState("");

  const handleStarClick = (e) => {
    console.log((Number.parseFloat(e.target.value) / 100) * 5);
    ratingPercentage.current.style.width = `${e.target.value}%`;
    setRating((Number.parseFloat(e.target.value) / 100) * 5);

    switch (e.target.value) {
      case "20":
        setRatingRemarks("Terrible");
        break;
      case "40":
        setRatingRemarks("Poor");
        break;
      case "60":
        setRatingRemarks("Fair");
        break;
      case "80":
        setRatingRemarks("Good");
        break;
      case "100":
        setRatingRemarks("Excellent");
        break;

      default:
        break;
    }
  };
  console.log(userProfile);

  const handleReviewSubmit = async () => {
    const addReview = async () => {
      const response = await fetch(
        "https://trend-flare-apparel-store-api.vercel.app/orders/addProductReview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: productId,
            orderId: orderId,
            userId: userProfile._id,
            currentRating: rating,
            reviewMsg: reviewMsg,
          }),
        }
      );
      const { status } = await response.json();
      console.log(status);
      if (status === "success") {
        toast.success("Review Submitted");
        Navigate("/review");
      }
    };
    addReview();
  };

  useEffect(() => {
    if (userProfile) {
      const authenticateProductPurchase = async () => {
        const response = await fetch(
          `https://trend-flare-apparel-store-api.vercel.app/orders/checkProductPurchase/${orderId}/${productId}`
        );
        const { order } = await response.json();
        setProduct(order);
      };

      authenticateProductPurchase();
    }
  }, []);
  return (
    <div id="addReviewComponent">
      {product && (
        <div
          style={{
            height: "80px",
            width: "100%",
            display: "flex",
            overflow: "hidden",

            alignItems: "center",
            padding: "5px",
            margin: "3% 0 ",
            backgroundColor: " rgb(243, 243, 243)",
          }}
          id="reviewProduct"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: window.visualViewport.width < 455 ? "90%" : "100%",
              width: window.visualViewport.width < 455 ? "20%" : "15%",
              overflow: "hidden",
              marginLeft: window.visualViewport.width < 455 && "3px",
            }}
          >
            <img style={{ width: "100%" }} src={product.CartImg} alt="" />
          </div>

          <div
            style={{
              width: window.visualViewport.width < 455 ? "75%" : "70%",
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
              {product.CartName}
            </h1>
            <p style={{ fontSize: "small", color: "gray" }}>
              Qty : {product.quantity}
            </p>
          </div>
        </div>
      )}

      <div id="startRating-Section">
        <p>Select Product Rating</p>

        <div id="clickablestars">
          <div ref={ratingPercentage} id="ratingPercentage"></div>
          <div id="ratingportions">
            <label className="ratingportionsChild" htmlFor="20%">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="20%"
                  value="20"
                  onChange={handleStarClick}
                  name="ratingbtns"
                  type="radio"
                />
              </div>
            </label>
            <label className="ratingportionsChild" htmlFor="40%">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="40%"
                  value="40"
                  onChange={handleStarClick}
                  name="ratingbtns"
                  type="radio"
                />
              </div>
            </label>
            <label className="ratingportionsChild" htmlFor="60%">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="60%"
                  value="60"
                  onChange={handleStarClick}
                  name="ratingbtns"
                  type="radio"
                />
              </div>
            </label>
            <label className="ratingportionsChild" htmlFor="80%">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="80%"
                  value="80"
                  onChange={handleStarClick}
                  name="ratingbtns"
                  type="radio"
                />
              </div>
            </label>
            <label className="ratingportionsChild" htmlFor="100%">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="100%"
                  value="100"
                  onChange={handleStarClick}
                  name="ratingbtns"
                  type="radio"
                />
              </div>
            </label>
          </div>
        </div>

        <div id="ratingRemarks">{ratingRemarks}</div>
      </div>

      <div id="ratingNote-Section">
        <div id="Reviewtext">
          <p>{reviewMsg.length}/200</p>
          <textarea
            onChange={(e) => {
              setReviewMsg(e.target.value);
            }}
            name=""
            id=""
            maxLength="200"
            placeholder="Write Something ..."
          ></textarea>
        </div>
        <button id="submitReviewBtn" onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default AddReview;
