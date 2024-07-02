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
  productSizes,
  productImages
}) {
  
  const { setProductPageId } = useContext(hooksContext);
  const { cartDispatch } = useContext(dispatchContext);
  const [thumbnailImage,setThumbnailImage]=useState(productImg);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(productImages)
    console.log(productSizes);
  },[])
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

  

  {
    /* <BsCart3 size={'40px'} color="white" /> */
  }

  return (
    <div uniquekey={productId} id="productUI" >
      <div
        
        id="productimg"
      >
        <img
          style={{transition:'2s'}}
          id="productImg"
          src={thumbnailImage}
          // src={`https://drive.google.com/file/d/1UBSzKO-tsUYWzYAqIVXOQhMAtkCVkfSC/view?usp=sharing`}
          // src={`https://drive.google.com/uc?export=view&id=1UBSzKO-tsUYWzYAqIVXOQhMAtkCVkfSC`}
          onClick={() => {
            navigate(`/productcard/${productId}`);
          }}
          onMouseEnter={(e)=>{
            
            setThumbnailImage(productImages[1])
            // e.target.style.opacity='100%'
            // e.target.style.opacity='100'
          }}
          onMouseLeave={()=>{
            setThumbnailImage(productImg)

          }}
        />

      </div>

      <div id="product-details">
        <h1 id="productName">{productName}</h1>
        {/* <div id="ratingStars">
          

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
        </div> */}
        <h1 id="productPrice">Rs {productPrice}</h1>
        <div className="size-variants-container">
          <div className={productSizes[0]>0 ?'size-variant-element':'size-variant-element-disabled'}>XS</div>
          <div className={productSizes[1]>0 ?'size-variant-element':'size-variant-element-disabled'}>S</div>
          <div className={productSizes[2]>0 ?'size-variant-element':'size-variant-element-disabled'}>M</div>
          <div className={productSizes[3]>0 ?'size-variant-element':'size-variant-element-disabled'}>L</div>
          <div className={productSizes[4]>0 ?'size-variant-element':'size-variant-element-disabled'}>XL</div>
        </div>
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
