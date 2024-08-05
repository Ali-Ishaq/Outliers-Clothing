import React, { useEffect, useState, useRef } from "react";
import "./HomePage.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";


const BannerImages = [
  // "https://overlaysnow.com/cdn/shop/files/LavenderButterflyPhoto_3.jpg?v=1712328768&width=1000",
  // "https://overlaysnow.com/cdn/shop/files/TangerineoverlaysPhoto_7.jpg?v=1712329447&width=1000",
  "banner1.jpg",
  "banner2.jpg",
  "banner1.jpg",
  "banner2.jpg",
];

function HomePage() {
  const navigate = useNavigate();
  // const [imageIndex,setImageIndex]=useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const slidesBtnRef=useRef([]);

  // const Images=['https://overlaysnow.com/cdn/shop/files/LavenderButterflyPhoto_3.jpg?v=1712328768&width=1000','https://overlaysnow.com/cdn/shop/files/TangerineoverlaysPhoto_7.jpg?v=1712329447&width=1000']

    useEffect(() => {
      slidesBtnRef.current.forEach(element => {
        element.style.backgroundColor=''
      });
      slidesBtnRef.current[imgIndex].style.backgroundColor='#ccc'
      
      const timeout = setTimeout(() => {
        if(imgIndex>=(BannerImages.length)-1){
          setImgIndex(0);
        }else{
          setImgIndex((prevIndex=>prevIndex+=1));

        }
      
      


      }, 3000);

      return () => clearTimeout(timeout); // Clean up the interval on component unmount
  }, [imgIndex]);

 
  return (
    <div className="homepage">
    
      <div className="body">
        <div className="landingPage">
      

          {/* <video autoPlay muted  loop >
          <source src='https://res.cloudinary.com/drwizlf0y/video/upload/v1705858393/TrendFlare/lv_0_20240121200508_zrnr6n.mp4' type="video/mp4" />
          </video> */}

          {/* <div className="landingPageLayer">
          
            <a href="#category-section" style={{display:'flex',justifyContent:'center'}}> <FaChevronDown size={'10%'} color="white"/> </a> 
          
          </div> */}
          <img loading="eager" src={BannerImages[imgIndex]} alt="" />
          <div className="slide-show-progress-bar">
          {
            BannerImages.map((elem,index)=>
              <div ref={(el)=>(slidesBtnRef.current[index]=el)}></div>
            )
          }
            
          </div>
        </div>

        <div id="category-section">
          {/* <h1 className="category-heading">Category</h1> */}

          <div className="collections">
            <div
              className="collections-box"
              onClick={() => {
                navigate("/products/Tees");
              }}
            >
              <h1>OVERSIZED</h1>
              <img
                src="https://overlaysnow.com/cdn/shop/files/TangerineoverlaysPhoto_7.jpg?v=1712329447&width=1000"
                alt=""
                loading="eager"
              />
            </div>
            <div
              className="collections-box"
              onClick={() => {
                navigate("/products/Tees");
              }}
            >
              <h1>T-SHIRTS</h1>
              <img
                src="https://overlaysnow.com/cdn/shop/files/LavenderButterflyPhoto_3.jpg?v=1712328768&width=1000"
                alt=""
                loading="eager"
              />
            </div>

            <div
              className="collections-box"
              onClick={() => {
                navigate("/products/Tees");
              }}
            >
              <h1>ARC</h1>
              <img
                src="https://overlays.co/cdn/shop/files/BeigeSetPhoto_6.jpg?v=1713004700&width=1000"
                alt=""
                loading="eager"
              />
            </div>

            <div
              className="collections-box"
              onClick={() => {
                navigate("/products/Tees");
              }}
            >
              <h1>T-SHIRTS</h1>
              <img
                src="https://overlaysnow.com/cdn/shop/files/GreenArisePhoto_4.jpg?v=1712329535&width=1000"
                alt=""
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
