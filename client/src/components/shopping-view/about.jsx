import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img1 from "../../assets/image/about-img.png";
import img2 from "../../assets/image/about-icon-1.png";
import img3 from "../../assets/image/about-icon-2.png";
import img4 from "../../assets/image/about-icon-3.png";
import "../../css/about.css";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleReadMore = () => {
    navigate(`/shop/about`); 
  }

  // Check if the current path is the home page
  const isHomePage = location.pathname === '/shop/home'; // Adjust this if your home path is different

  return (
    <div className='aka'>
      <section className="about" id="about">
        <h1 className="heading">about us <span className='text-[#A67C6D] font-bold'>why choose us</span></h1>
        <div className="row">
          <div className="image">
            <img src={img1} alt="" />
          </div>
          <div className="content">
            <h3 className="title">what's make our coffee special!</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id perferendis dolores, atque tenetur laboriosam error!</p>
            {isHomePage && ( // Conditionally render the button
              <button onClick={handleReadMore} className='btn'>Đọc thêm</button>
            )}
            <div className="icons-container">
              <div className="icons">
                <img src={img2} alt="" />
                <h3>quality coffee</h3>
              </div>
              <div className="icons">
                <img src={img3} alt="" />
                <h3>our branches</h3>
              </div>
              <div className="icons">
                <img src={img4} alt="" />
                <h3>free delivery</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;