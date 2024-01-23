import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GiEagleHead } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

import {useState,useEffect, useContext, useRef } from "react";
import { userContext } from "../Contexts/userContext";

function Header({ cartlength }) {
  const navigate = useNavigate();
  const { isUserLogged, logOutFunction } = useContext(userContext);
  const navMenus = useRef();

  const [isNavbarVisible, setNavbarVisibility] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      // Check if scrolled down at least 15vh from the top
      const scrolled15vh = currentScrollPos >= window.innerHeight * 0.15;

      // Hide the navbar only if scrolled down and at least 15vh from the top
      setNavbarVisibility(!(isScrollingDown && scrolled15vh));

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);



  const closeMenu = () => {
    if (window.visualViewport.width < 780) {
      navMenus.current.style.width = "0";
    }
  };

  


  return (
    
    <div style={isNavbarVisible ? {} : {transform:'translateY(-101%)'}} id="header">
      <div id="header-1">
        <div id="announcement">
          Free shipping, 30-day return or refund .
        </div>
        <div id="faqs">
          {/* <a href="" className="navigations">SIGN IN</a> */}
          <Link to="/loginform" className="navigations">
            {isUserLogged === true ? "Log Out" : "Sign Up"}
          </Link>
          <a href="" className="navigations">
            FAQS
          </a>
          <select className="navigations" name="currency" id="">
            <option>USD</option>
            <option>GBP</option>
            <option>PKR</option>
          </select>
        </div>
      </div>

      <div id="header-2">
        <div
          id="hamburgerMenu"
          style={{ display: "none" }}
          onClick={() => {
            navMenus.current.style.width = "80vw";
          }}
        >
          <RxHamburgerMenu size="25px" />
        </div>

        <div id="logo">
          
          <img src="https://res.cloudinary.com/drwizlf0y/image/upload/v1705763032/TrendFlare/vecteezy_creative-letter-t-f-elegant-monogram-logo_10858087_1_av2dvq.jpg" alt="" style={{height:'70%',filter:'invert(100%)'}} />
        </div>

        
        <div style={(!isNavbarVisible && window.visualViewport.width<780)?{transform:'translateY(8.6vh)'}:{}} id="navbar-elems" ref={navMenus}>
          {window.visualViewport.width < 780 && (
            <div id="hamBurgerLogo">
              
              <img src="https://res.cloudinary.com/drwizlf0y/image/upload/v1705763032/TrendFlare/vecteezy_creative-letter-t-f-elegant-monogram-logo_10858087_1_av2dvq.jpg"style={{height:'70%',filter:'invert(100%)',mixBlendMode:'darken'}} alt="" />
              <RxCross1
                style={{ position: "absolute", right: "20px" }}
                onClick={() => {
                  navMenus.current.style.width = "0px";
                }}
                size="25px"
              />
            </div>
          )}

          <ul id="navlinks">
            <li
              onClick={closeMenu}
              className="navlinks"
            >
              <Link to="/">Home</Link>
            </li>
            <li  onClick={closeMenu}className="navlinks">
              <Link  to="">Shop</Link>
            </li>

            
            <li onClick={closeMenu} className="navlinks">
              <Link to="" >Pages</Link>
            </li>
            <li  onClick={closeMenu}className="navlinks">
              <Link to="">Blog</Link>
            </li>
            <li onClick={closeMenu} className="navlinks">
              <Link to="">Contact</Link>
            </li>
            {window.visualViewport.width< 455 && isUserLogged &&<li onClick={closeMenu} className="navlinks">
              <Link to="/loginform">Account</Link>
            </li>}
          </ul>

          {window.visualViewport.width < 780 && (
            <div id="userAccountLink">
              <button
                onClick={() => {
                  if (!isUserLogged) {
                    
                  }
                  if (isUserLogged) {
                    logOutFunction();
                  }
                  navigate("/loginform");
                  closeMenu()

                }}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "0px",
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                 
                }}
              >
                {isUserLogged === true && (
                  <SlLogout style={{ marginRight: "10px" }} size="20px" />
                )}{" "}
                {isUserLogged === true ? "Log Out" : "Sign Up"}
              </button>
            </div>
          )}
        </div>

        <div id="cart">
          
          <div id="cart-icon">
            {" "}
            <Link to="/cart">
              {" "}
              <BsCart3
                color="black"
                style={{ textDecoration: "none" }}
                id="cart-img"
                className="icons"
                size={"25px"}
              />{" "}
            </Link>
            <div id="cart-counter">{cartlength}</div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
