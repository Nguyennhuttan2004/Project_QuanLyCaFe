// import React from 'react';

// import { Link } from 'react-router-dom';

// import fbLogo from './../../assets/icons/facebook.svg';
// import igLogo from './../../assets/icons/instagram.svg';
// import twLogo from './../../assets/icons/twitter.svg';
// import logo from './../../assets/icons/jokopi.svg';
import './../../css/footer.css'

 
const AuthFooter = () => {
  return (
    <>
    <footer>
  <div className="container">
    <div className="footer_top wow animate__animated animate__fadeInUp">
      <div className="footer_text">
        <h2>Subscribe To Our Newsletter</h2>
      </div>
      <div className="footer_form">
        <form action>
          <input type="text" name id placeholder="Your Email Address" />
          <button>
            <i className="fa-light fa-paper-plane-top" />
          </button>
        </form>
      </div>
    </div>
    <div className="footer_bottom">
      <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
        <a href="#">
          <img src="./images/logo-white.png" alt />
        </a>
        <ul className="footer_contact">
          <li>
            <i className="fa-solid fa-phone" />
            <span>1800-123-4567 <br />
              +91 987-654-3210</span>
          </li>
          <li>
            <i className="fa-solid fa-envelope" />
            <span>info@example.com <br />
              services@gmail.com</span>
          </li>
          <li>
            <i className="fa-solid fa-location-dot" />
            <span>
              Demo Address #8901 Marmora
              <br />
              Road City</span>
          </li>
        </ul>
      </div>
      <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
        <h3>Our links</h3>
        <ul>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Home</a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              about Us
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Services
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Team</a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Blog</a>
          </li>
        </ul>
      </div>
      <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
        <h3>Our Services</h3>
        <ul>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Strategy &amp; Research
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Web Development
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Web Solution
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Digital Marketing
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              App Design
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
        <h3>Other links</h3>
        <ul>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              FAQ
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Portfolio
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Terms &amp; Conditions
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-angle-right" />
              Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="footer_copyright">
    <div className="container">
      <div className="footer_content">
        <div className="footer_left">
          <p>
            Copyright © 2021 <span>DexignZone</span> . All rights reserved.
          </p>
        </div>
        <div className="footer_right">
          <a href="#">
            <i className="fa-brands fa-facebook" />
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter" />
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

    </>
  );
};

export default AuthFooter;
