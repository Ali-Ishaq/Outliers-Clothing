import { useEffect, useState } from "react";
import "./productUI.css";
import { BsCart3 } from "react-icons/bs";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { hooksContext } from "../Contexts/hooksContext";
import { dispatchContext } from "../Contexts/dispatchContext";

function ProductUI({
  productId,
  productImg,
  productName,
  productPrice,
  productReviews,
}) {
  const [style, setStyle] = useState();
  const { setProductPageId } = useContext(hooksContext);
  const { cartDispatch } = useContext(dispatchContext);
  const navigate = useNavigate();

  //This function will take the prduct id of the targeted products and sends it to App component
  function clickHandle(e) {
    // e.preventDefault();
    // e.stopPropagation();

    // e.target.style.backgroundColor = "lime";

    if (e.target.className == "cartbtn") {
      const productDetails={
        
      img :productImg,
      name :productName,
      price :productPrice,
      productcode : productId,
      id:productId,
      }
      cartDispatch({ type: "updateCart", payload: productDetails });
    }

    if (e.target.className == "searchbtn") {
      navigate(`/productcard/${productId}`);
    }
  }

  function mouseenterhandle() {
    setStyle({ zIndex: "1" });
  }

  function mouseleavehandle(e) {
    setStyle({ zIndex: "3" });
  }

  {
    /* <BsCart3 size={'40px'} color="white" /> */
  }

  return (
    <div uniquekey={productId} id="productUI" >
      <div
        onMouseEnter={mouseenterhandle}
        onMouseLeave={mouseleavehandle}
        id="productimg"
      >
        <img
          style={style}
          id="productImg"
          src={productImg}
          // src={`https://drive.google.com/file/d/1UBSzKO-tsUYWzYAqIVXOQhMAtkCVkfSC/view?usp=sharing`}
          // src={`https://drive.google.com/uc?export=view&id=1UBSzKO-tsUYWzYAqIVXOQhMAtkCVkfSC`}
          onClick={() => {
            navigate(`/productcard/${productId}`);
          }}
        />
        <div id="layer">
          <button
            className="cartbtn"
            onClick={clickHandle}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
          >
            <BsCart3 size={"25px"} style={{ pointerEvents: "none" }} />
          </button>

          <button className="wishbtn">
            <FiHeart size={"25px"} style={{ pointerEvents: "none" }} />
          </button>

          <Link to={`/ProductCard/${productId}`}>
            <button onClick={clickHandle} className="searchbtn">
              <FiSearch size={"25px"} style={{ pointerEvents: "none" }} />
            </button>
          </Link>
        </div>
      </div>

      <div id="product-details">
        <h1 id="productName">{productName}</h1>
        <div id="ratingStars">
          

          <div
          id="imgbg"
          style={{
            width: "60%",
            backgroundColor: "#cccccc",
            height: "100%",
            position: "relative",
            display: "flex",
            WebkitMaskImage:"url('/rating.png')",
          
            
            WebkitMaskSize: "100%",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition:'cover'
            
          }}
        >
          <div
            id="ratingScore"
            style={{
              display: "flex",
              height: "100%",
              width: `${(productReviews.rating/5)*100}%`,
              position: "absolute",
              top: "0",
              left: "0",
              backgroundColor: "#fbe22f",
            }}
          ></div>
        </div>
        </div>
        <h1 id="productPrice">${productPrice}</h1>
        <button
          style={{ display: "none" }}
          className="cartbtn"
          onClick={clickHandle}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
        >
          <BiPlus size="17px" style={{ pointerEvents: "none" }} />
        </button>
      </div>
    </div>
  );
}

export default ProductUI;
