import { useContext, useEffect, useRef, useState } from "react";
import { hooksContext } from "../Contexts/hooksContext";
import "./productcard.css";
import "./loader.css";
import { dispatchContext } from "../Contexts/dispatchContext";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";


function ProductCard({ productsDb }) {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [productSize, setProductSize] = useState(null);
  const { id } = useParams();
  const sizeChartRef=useRef()
  const [showDescription, setShowDescription] = useState(false);

  const {OverlayVisibility,setOverlayVisibility}=useContext(hooksContext)
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
      size: productSize,
    };
    cartDispatch({ type: "updateCart", payload: productDetails });
  }

  const handleSizeChange = (e) => {
    setProductSize(e.target.value);
    console.log(productSize);
  };
  const sizeLeft = () => {
    if (productSize === "xs") return 0;
    else if (productSize === "s") return 1;
    else if (productSize === "m") return 2;
    else if (productSize === "l") return 3;
    else return 4;
  };

  const handleImageToggle = (direction) => {
    let size = product.images.length - 1;
    if (direction === "right") {
      setMainImage((prevValue) => {
        if (prevValue < size) {
          return prevValue + 1;
        } else {
          return 0;
        }
      });
    } else {
      setMainImage((prevValue) => {
        if (prevValue > 0) {
          return prevValue - 1;
        } else {
          return size;
        }
      });
    }
  };

  const handleChartToggle=(status)=>{

    if(window.visualViewport.width<600){

      if(status==='close'){
        sizeChartRef.current.style.translate='';
        document.body.style.overflow='';

        setOverlayVisibility(false)
        
        }else{
          sizeChartRef.current.style.translate='0 0%';
          document.body.style.overflow='hidden';
          setOverlayVisibility(true)
        
      }
  
    }else{

      if(status==='close'){
        sizeChartRef.current.style.translate='';
        document.body.style.overflow='';
        document.body.style.marginRight='';
        setOverlayVisibility(false)
        
        }else{
          sizeChartRef.current.style.translate='0';
          document.body.style.overflow='hidden';
          document.body.style.marginRight='17px';
          setOverlayVisibility(true)
        
      }
  
  
    }

    
  }

  return (
    <div id="productcard">
      {product != null ? (
        <>
          <div id="product-images-section">
            <div id="image-thumbnails">
              {product.images.map((obj, i) => {
                return (
                  <li
                    className="extra-images"
                    onClick={() => {
                      setMainImage(i);
                    }}
                    style={
                      mainImage === i ? { outline: "2px solid #1a1a1a" } : {}
                    }
                  >
                    <img src={obj} alt="" />
                  </li>
                );
              })}
            </div>

            <div id="image-thumbnails-mobile-view" style={{ display: "none" }}>
              <svg
                focusable="false"
                width="17"
                height="14"
                class="icon icon--nav-arrow-left  icon--direction-aware "
                viewBox="0 0 17 14"
                onClick={() => {
                  handleImageToggle("left");
                }}
              >
                <path
                  d="M17 7H2M8 1L2 7l6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                ></path>
              </svg>

              <div id="image-toggle-radio">
                {product.images.map((obj, i) => {
                  return (
                    <input
                      type="radio"
                      name="image-toggle-btns"
                      className="extra-images"
                      checked={i === mainImage}
                      onClick={() => {
                        setMainImage(i);
                      }}
                      style={
                        mainImage === i ? { outline: "2px solid #1a1a1a" } : {}
                      }
                    />
                  );
                })}
              </div>

              <svg
                focusable="false"
                width="17"
                height="14"
                class="icon icon--nav-arrow-right  icon--direction-aware "
                viewBox="0 0 17 14"
                onClick={() => {
                  handleImageToggle("right");
                }}
              >
                <path
                  d="M0 7h15M9 1l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                ></path>
              </svg>
            </div>

            <div id="main-image">
              <span id="left-arrow">
                <SlArrowLeft />
              </span>

              <img src={product.images[mainImage]} alt="" />
              <span id="right-arrow">
                <SlArrowRight />
              </span>
            </div>
          </div>

          <div id="details">
            <h1 id="brand-name">OUTLIERS CLOTHING</h1>
            <h1 id="productname">{product.title}</h1>
           
            
            <div id="review-stars">
            
              <div class="stars-outer">
                <div class="stars-inner" style={{width: `${(product.reviews.rating / 5) * 100}%`}}></div>
              </div>
              <p className="reviews-count">({product.reviews.reviewers})</p>
            
            </div>

            <h1 id="productprice"> Rs {product.price}</h1>
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
                  <a href="#" onClick={handleChartToggle} >Size chart</a>
                </p>
              </div>
              <div id="product-variants-radio">
                <form action="" onChange={handleSizeChange}>


                <div className="size-variant-button-parent">
                    <input
                      type="radio"
                      id="size-xs"
                      name="size"
                      value="xs"
                      disabled={product.quantity[0] < 1}
                    />
                    <label htmlFor="size-xs" className="size-variant-button">
                      XS
                    </label>
                  </div>

                  <div className="size-variant-button-parent">
                    <input
                      type="radio"
                      id="size-s"
                      name="size"
                      value="s"
                      disabled={product.quantity[1] < 1}
                    />
                    <label htmlFor="size-s" className="size-variant-button">
                      S
                    </label>
                  </div>

                  <div className="size-variant-button-parent">
                    <input
                      type="radio"
                      id="size-m"
                      name="size"
                      value="m"
                      disabled={product.quantity[2] < 1}
                    />
                    <label htmlFor="size-m" className="size-variant-button">
                      M
                    </label>
                  </div>

                  <div className="size-variant-button-parent">
                    <input
                      type="radio"
                      id="size-l"
                      name="size"
                      value="l"
                      disabled={product.quantity[3] < 1}
                    />
                    <label htmlFor="size-l" className="size-variant-button">
                      L
                    </label>
                  </div>

                  <div className="size-variant-button-parent">
                    <input
                      type="radio"
                      id="size-xl"
                      name="size"
                      value="xl"
                      disabled={product.quantity[4] < 1}
                    />
                    <label htmlFor="size-xl" className="size-variant-button">
                      XL
                    </label>
                  </div>


                </form>
              </div>
              {productSize && (
                <p>Only {product.quantity[sizeLeft()]} left in stock !</p>
              )}
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


      <div ref={sizeChartRef}  id="size-chart">
          <div className="sizeChart-toggle-menu">
            <RxCross1 onClick={()=>{handleChartToggle('close')}}/>
          </div>
          <div className="sizeChart-image-container">

          <img src="https://overlays.co/cdn/shop/files/TSHIRT-RElaxed-size-chart.png?v=1680184202" alt="" />
          </div>
          
      </div>
    </div>
  );
}

export default ProductCard;
