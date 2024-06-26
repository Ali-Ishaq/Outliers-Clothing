import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart  } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { GiEagleHead } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { hooksContext } from "../Contexts/hooksContext";
import { useState, useEffect, useContext, useRef } from "react";
import { userContext } from "../Contexts/userContext";

function Header({ cartlength }) {
  const navigate = useNavigate();
  const { isUserLogged, logOutFunction } = useContext(userContext);
  const { Overlay } = useContext(hooksContext);
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
      if(document.getElementById('products')!=null && window.visualViewport.width>'780'){
        setNavbarVisibility(true);

      }else{

        setNavbarVisibility(!(isScrollingDown && scrolled15vh));
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const closeMenu = () => {
    if (window.visualViewport.width < 780) {
      navMenus.current.style.translate = "-100vw";
    }
    Overlay.current.style.display = "none";
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div style={isNavbarVisible ? {} : { translate: "0 -100px" }} id="header">
        <div id="header-1">
          <div id="announcement">Free shipping, 30-day return or refund .</div>
          <div id="faqs">
            {/* <a href="" className="navigations">SIGN IN</a> */}
            <Link to="/loginform" className="navigations">
              {isUserLogged === true ? <SlLogout /> : <FaUser />}
            </Link>
            {/* <a href="" className="navigations">
            FAQS
          </a>
          <select className="navigations" name="currency" id="">
            <option>USD</option>
            <option>GBP</option>
            <option>PKR</option>
          </select> */}
          </div>
        </div>

        <div id="header-2">
          <div
            id="hamburgerMenu"
            style={{ display: "none" }}
            onClick={() => {
              navMenus.current.style.translate = "0vw";
              Overlay.current.style.display = "flex";
              document.body.style.overflow = "hidden";
            }}
          >
            <RxHamburgerMenu size="25px" />
          </div>

          <div id="search-icon">
          <FiSearch size={"20px"}/>
          </div>

          <div id="logo">
            <img
              src="https://overlays.co/cdn/shop/files/Overlays_LOGO_150x150_02d0e0fb-6b69-4a21-902d-32c59760e50c_150x.jpg?v=1713180477"
              alt=""
              loading="eager"
              
            />
            {/* <h1 style={{fontFamily:' "Lobster", sans-serif',fontWeight:'400',fontStyle:'normal',fontSize:'40px'}}>Outliers.</h1> */}
          </div>

          {/* style={(!isNavbarVisible && window.visualViewport.width<780)?{transform:'translateY(8.6vh)'}:{}} */}
          
          

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


        <div id="navbar-elems">
            <ul id="navlinks">
              <li onClick={closeMenu} className="navlinks">
                <Link to="/">Home</Link>
              </li>
              <li onClick={closeMenu} className="navlinks">
                <Link to="">Shop All</Link>
              </li>

              <li onClick={closeMenu} className="navlinks">
                <Link to="">Men</Link>
              </li>

              <li onClick={closeMenu} className="navlinks">
                <Link to="">Sale</Link>
              </li>

              <li onClick={closeMenu} className="navlinks">
                <Link to="">Oversized</Link>
              </li>

              <li onClick={closeMenu} className="navlinks">
                <Link to="">Contact Us</Link>
              </li>
            </ul>
          </div>
      </div>

      <div
        id="navbar-elems-mobile-view"
        ref={navMenus}
        style={{ display: "none" }}
      >
        {window.visualViewport.width < 780 && (
          <div id="hamBurgerLogo">
            <RxCross1
              onClick={() => {
                navMenus.current.style.translate = "-100vw";
                Overlay.current.style.display = "none";
                document.body.style.overflow = "unset";
              }}
              size="25px"
            />
          </div>
        )}

        <ul id="navlinks">
          <li onClick={closeMenu} className="navlinks">
            <Link to="/">Home</Link>
          </li>
          <li onClick={closeMenu} className="navlinks">
            <Link to="">Shop All</Link>
          </li>

          <li onClick={closeMenu} className="navlinks">
            <Link to="">Men</Link>
          </li>

          <li onClick={closeMenu} className="navlinks">
            <Link to="">Sale</Link>
          </li>

          <li onClick={closeMenu} className="navlinks">
            <Link to="">Oversized</Link>
          </li>

          <li onClick={closeMenu} className="navlinks">
            <Link to="">Contact Us</Link>
          </li>
          {window.visualViewport.width < 455 && isUserLogged && (
            <li onClick={closeMenu} className="navlinks">
              <Link to="/loginform">Account</Link>
            </li>
          )}
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
                closeMenu();
              }}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                border: "0px",
                fontSize: "20px",
                display: "flex",
                justifyContent: "start",
                paddingInline:'24px',
                alignItems: "center",
              }}
            >
              {isUserLogged === true && (
                <SlLogout size="20px" />
              )}{" "}
              {isUserLogged === true ? (
                <p>Log Out</p>
              ) : (
                <>
                  <svg
                    focusable="false"
                    width="18"
                    height="17"
                    class="icon icon--header-customer   "
                    viewBox="0 0 18 17"
                  >
                    <circle
                      cx="9"
                      cy="5"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linejoin="round"
                    ></circle>
                    <path
                      d="M1 17v0a4 4 0 014-4h8a4 4 0 014 4v0"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>{" "}
                  <p>Sign Up</p>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
