import React from "react";
import "./footer.css";
import { SiFacebook, SiYoutube, SiInstagram, SiLinkedin } from "react-icons/si";
import { IoLocationSharp , IoCallSharp ,IoMailSharp} from "react-icons/io5";
import { GiEagleHead } from "react-icons/gi";


function Footer() {
  return (
    <div id="footer">

    <div id="footer-section-1">
    <div id="logo-section">
        <div id="footer-logo">
          
          
          
          <img src="/logo2.jpg" alt=""  />
    {/* <h1 style={{fontSize:'500%'}}>Otlrs</h1> */}
          
        </div>
        <div id="social-icons">
          <h1>Follow Us</h1>
          <ul>
            <li>
              <SiFacebook color="#F3F3F4" size={"28px"} />
            </li>
            <li>
              <SiYoutube color="#F3F3F4" size={"28px"} />
            </li>
            <li>
              <SiInstagram color="#F3F3F4" size={"28px"} />
            </li>
            <li>
              <SiLinkedin color="#F3F3F4" size={"28px"} />
            </li>
          </ul>
        </div>
      </div>

      <div id="contact-section">
        <h1>Connect with us</h1>
        <div className="contact-details">
          <div className="contact-icon"><IoLocationSharp size={'30px'} color="#F3F3F4"/></div>
            <div className="contact-paras">
              <p >Find us</p>
              <p>42 Willow Lane, Apt 5B, Maplewood Heights, Karachi, Pakistan</p>
            </div>
        
        </div>
        <div className="contact-details">
          <div className="contact-icon"><IoCallSharp size={'30px'} color="#F3F3F4"/></div>
            <div className="contact-paras">
              {" "}
              <p>Call us</p>
              <p>+92 3313894077</p>
            </div>
        
        </div>
        <div className="contact-details">
          <div className="contact-icon"><IoMailSharp size={'30px'} color="#F3F3F4"/></div>
            <div className="contact-paras">
              <p>Mail us</p>
              <p>outliers.clothing@gmail.com</p>
            </div>
         
        </div>
      </div>
    </div>

    <div id="footer-section-2">
         <a style={{textDecoration:'none'}} href="https://portfolio-ali-ishaq.vercel.app/" target="_blank"><h1>© Copyright 2023 Outliers Clothing All Rights Reserved</h1></a>
        
    </div>
  


    </div>
  );
}

export default Footer;
