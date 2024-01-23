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
              src="https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              src="https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
