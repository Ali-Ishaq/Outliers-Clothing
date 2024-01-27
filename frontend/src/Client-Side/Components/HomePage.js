import React from "react";
import "./HomePage.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";


function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="body">
        <div className="landingPage">

          <video autoPlay muted  loop >
          <source src='https://res.cloudinary.com/drwizlf0y/video/upload/v1705858393/TrendFlare/lv_0_20240121200508_zrnr6n.mp4' type="video/mp4" />
          </video>

          <div className="landingPageLayer">
          
            <a href="#category-section" style={{display:'flex',justifyContent:'center'}}> <FaChevronDown size={'10%'} color="white"/> </a> 
          
          </div>
        </div>


        <div id="category-section">

        {/* <h1 className="category-heading">Category</h1> */}
        

        <div className="collections">
          <div
            className="collections-box"
            onClick={() => {
              navigate("/products/Sneakers");
            }}
          >
            <h1>SNEAKERS</h1>
            <img
              src="/sneakerbanner.avif"
              alt=""
            />
          </div>
          <div
            className="collections-box"
            onClick={() => {
              navigate("/products/Watches");
            }}
          >
            <h1>WATCHES</h1>
            <img
              src="/watchbanner.avif"
              alt=""
              
            />
          </div>

          <div
            className="collections-box"
            onClick={() => {
              navigate("/products/Tees");
            }}
          >
            <h1>TEES</h1>
            <img
              src="/shirtbanner.avif"
              alt=""
            />
          </div>
          <div className="collections-box"
          onClick={()=>{
            navigate("/products/Casual");
          }}
          >
            <h1>CASUAL</h1>
            <img
              src="casualbanner.avif"
              alt=""
              style={{ width: "auto", height: "100%" }}
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
