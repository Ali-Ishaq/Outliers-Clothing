import { useContext, useEffect, useRef, useState } from "react";
import { hooksContext } from "../Contexts/hooksContext";
import "./productcard.css";
import "./loader.css";
import { dispatchContext } from "../Contexts/dispatchContext";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { SlArrowRight,SlArrowLeft } from "react-icons/sl";

function ProductCard({ productsDb }) {
  const [product, setProduct] = useState(null);
  const [mainImage,setMainImage]=useState(0)
  const [productSize,setProductSize]=useState(null);
  const { id } = useParams();
  const [showDescription, setShowDescription] = useState(false);

  const { cartDispatch } = useContext(dispatchContext);
  // const { productPageId } = useContext(hooksContext);

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetch(`http://192.168.0.129:3000/products/${id}`);
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
      size:productSize
    };
    cartDispatch({ type: "updateCart", payload: productDetails });
  }

  const handleSizeChange=(e)=>{
    setProductSize(e.target.value);
    console.log(productSize)

  }
  const sizeLeft=()=>{
    if(productSize==='s')
      return 0;
    else if(productSize==='m')
      return 1;
    else
      return 2;
  }

  return (
    <div id="productcard">
      {product != null ? (
        <>
          <div id="product-images-section">
            <div id="image-thumbnails">
              
              {/* <li className="extra-images">
                <img src={product.thumbnail} alt="" />
              </li>
              <li className="extra-images">
                <img src={product.thumbnail} alt="" />
              </li>
              <li className="extra-images">
                <img src={product.thumbnail} alt="" />
              </li>
              <li className="extra-images">
                <img src={product.thumbnail} alt="" />
              </li>
              <li className="extra-images">
                <img src={product.thumbnail} alt="" />
              </li> */}

              {product.images.map((obj,i)=>{
                return(
                <li className="extra-images" onClick={()=>{setMainImage(i)}} style={mainImage===i?{outline: '2px solid #1a1a1a'}:{}}>
                <img src={obj} alt=""  />
              </li>
                )
              })}


            </div>
            <div id="main-image">
              <span id="left-arrow" ><SlArrowLeft /></span>
              
              <img src={product.images[mainImage]} alt="" />
              <span id="right-arrow" ><SlArrowRight /></span>
            </div>
          </div>

          <div id="details">
            <h1 id="brand-name">Outliers Clothing</h1>
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
                    WebkitMaskImage: "url('/rating.png')",
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
            <hr
              style={{
                width: "100%",
                height: "2px",
                border: "0px",
                backgroundColor: "lightgray",
              }}
            />

            <div id="product-variants">
              <div id="product-variants-heading">
                <p>Size: M</p>
                <p>
                  <a href="">Size chart</a>
                </p>
              </div>
              <div id="product-variants-radio">

              <form action="" onChange={handleSizeChange}>
                <div className="size-variant-button-parent">
                  <input type="radio" id="size-s" name="size" value="s" disabled={product.quantity[0]<1}/>
                  <label htmlFor="size-s" className="size-variant-button">
                    S
                  </label>
                </div>

                <div className="size-variant-button-parent">
                  <input type="radio" id="size-m" name="size" value="m" disabled={product.quantity[1]<1} />
                  <label htmlFor="size-m" className="size-variant-button">
                    M
                  </label>
                </div>

                <div className="size-variant-button-parent">
                  <input type="radio" id="size-l" name="size" value="l" disabled={product.quantity[2]<1} />
                  <label htmlFor="size-l" className="size-variant-button">
                    L
                  </label>
                </div>
                </form>
              </div>
              {productSize&&<p>Only {product.quantity[sizeLeft()]} left in stock !</p>}
            </div>

            <button onClick={clickHandle} uniquekey={product.id} id="cartbtn2">
              ADD TO CART
            </button>
            <button
              onClick={clickHandle}
              uniquekey={product.id}
              id="proceed-btn"
            >
              PROCEED TO BUY
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
