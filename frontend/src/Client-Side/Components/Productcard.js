import { useContext, useEffect, useState } from "react";
import { hooksContext } from "../Contexts/hooksContext";
import "./productcard.css";
import "./loader.css";
import { dispatchContext } from "../Contexts/dispatchContext";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

function ProductCard({ productsDb }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [showDescription, setShowDescription] = useState(false);

  const { cartDispatch } = useContext(dispatchContext);
  // const { productPageId } = useContext(hooksContext);

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetch(
        `https://trend-flare-apparel-store-api.vercel.app/products/${id}`
      );
      const data = await response.json();
      setProduct(data.data);

      console.log(data.data.rating);
      console.log(data.data);
    };
    getOneProduct();
  }, []);

  function clickHandle(e) {
    const productDetails = {
      img: product.thumbnail,
      name: product.title,
      price: product.price,
      productcode: product._id,
      id: product._id,
    };
    cartDispatch({ type: "updateCart", payload: productDetails });
  }

  return (
    <div id="productcard">
      {product != null ? (
        <>
          <div id="img">
            <img src={product.thumbnail} alt="" />
          </div>
          <div id="details">
            <div id="productname">{product.title}</div>
            <div id="rating-stars">
              <div id="ratingStars2">
                <div
                  id="imgbg"
                  style={{
                    width: "80%",
                    backgroundColor: "#cccccc",
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    WebkitMaskImage:
                      "url('https://res.cloudinary.com/drwizlf0y/image/upload/v1704897004/TrendFlare/rating_ai8xvg.png')",
                    WebkitMaskSize: "100%",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <div
                    id="ratingScore"
                    style={{
                      display: "flex",
                      height: "100%",
                      width: `${(product.reviews.rating / 5) * 100}%`,
                      position: "absolute",
                      top: "0",
                      left: "0",
                      backgroundColor: "#fbe22f",
                    }}
                  ></div>
                </div>
                <p
                  style={{
                    width: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  ( {product.reviews.reviewers} )
                </p>
              </div>
            </div>
            <div id="productprice"> $ {product.price}</div>
            {/* <div id="reviewStars">
              <div id="stars"></div>
            </div> */}

            <div
              id="productdescription"
              onClick={() => {
                setShowDescription((prev) => !prev);
              }}
            >
              <span
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  width: "100%",
                  display: "flex",
                  gap: "1.2rem",
                }}
              >
                <p style={{ fontSize: "120%" }}>DETAILS</p>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {showDescription ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </span>
              <p
                style={
                  showDescription
                    ? { height: "auto", width: "100%" }
                    : { height: "0", width: "100%", overflow: "hidden" }
                }
                className="descriptionContent"
              >
                {product.description}
              </p>
            </div>
            <button onClick={clickHandle} uniquekey={product.id} id="cartbtn2">
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <div className="defautloader-container">
          <div class="defautloader"></div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
