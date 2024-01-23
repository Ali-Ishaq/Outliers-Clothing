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
          
          <div className="svg">
          
          <img src="https://res.cloudinary.com/drwizlf0y/image/upload/v1705763032/TrendFlare/vecteezy_creative-letter-t-f-elegant-monogram-logo_10858087_1_av2dvq.jpg" alt="" style={{height:'100%'}} />

          </div>
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
              <p>42 Willow Lane, Apt 5B, Maplewood Heights, Pineville, United States</p>
            </div>
        
        </div>
        <div className="contact-details">
          <div className="contact-icon"><IoCallSharp size={'30px'} color="#F3F3F4"/></div>
            <div className="contact-paras">
              {" "}
              <p>Call us</p>
              <p>+92 3859820726</p>
            </div>
        
        </div>
        <div className="contact-details">
          <div className="contact-icon"><IoMailSharp size={'30px'} color="#F3F3F4"/></div>
            <div className="contact-paras">
              <p>Mail us</p>
              <p>TrendFlare@gmail.com</p>
            </div>
         
        </div>
      </div>
    </div>

    <div id="footer-section-2">
         <a style={{textDecoration:'none'}} href="https://TrendFlare.com/"><h1>© Copyright 2023 TrendFlare All Rights Reserved</h1></a>
        
    </div>
  


    </div>
  );
}

export default Footer;
