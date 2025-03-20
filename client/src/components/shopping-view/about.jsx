import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img1 from "../../assets/image/about-img.png";
import img2 from "../../assets/image/about-icon-1.png";
import img3 from "../../assets/image/about-icon-2.png";
import img4 from "../../assets/image/about-icon-3.png";
import img5 from "../../assets/image/menu2.png";
import imgPort1 from "../../assets/image/imagePortfolio/e1.png";
import imgPort2 from "../../assets/image/imagePortfolio/e2.png";
import imgPort3 from "../../assets/image//imagePortfolio/banner-1.jpg";
import imgPort4 from "../../assets/image/imagePortfolio/e4.png";
import imgPort5 from "../../assets/image/imagePortfolio/e7.png";
import imgPort6 from "../../assets/image/imagePortfolio/e9.png";

import "../../css/about.css";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleReadMore = () => {
    navigate(`/shop/about`);
  };

  // Check if the current path is the home page
  const isHomePage = location.pathname === "/shop/home"; // Adjust this if your home path is different

  return (
    <div className="aka">
      <section className="about dark:bg-gray-900" id="about">
        <h1 className="heading">
          about us{" "}
          <span className="text-[#A67C6D] font-bold">why choose us</span>
        </h1>
        <div className="row">
          <div className="image">
            <img src={img1} alt="" />
          </div>
          <div className="content">
            <h3 className="title">Mỗi tách cà phê, một câu chuyện</h3>
            <p className="text-gray-700 dark:text-gray-300 ">
              Chào mừng bạn đến với quán cà phê của chúng tôi, nơi mang đến cho
              bạn những trải nghiệm tuyệt vời nhất. Tại đây, chúng tôi không chỉ
              phục vụ những tách cà phê thơm ngon được chế biến từ hạt cà phê
              chất lượng cao, mà còn tạo ra một không gian ấm cúng và thân
              thiện, lý tưởng cho những buổi gặp gỡ bạn bè hay những giờ phút
              thư giãn một mình. Với đội ngũ nhân viên nhiệt tình và chuyên
              nghiệp, chúng tôi cam kết mang đến cho bạn dịch vụ tốt nhất. Hãy
              đến và khám phá hương vị độc đáo của từng ly cà phê, cùng với
              những món ăn nhẹ hấp dẫn, để cảm nhận sự khác biệt mà chúng tôi
              mang lại!
            </p>
            {isHomePage && (
              <button onClick={handleReadMore} className="btn">
                Đọc thêm
              </button>
            )}
            <div className="icons-container">
              <div className="icons">
                <img src={img2} alt="" />
                <h3>cà phê chất lượng</h3>
              </div>
              <div className="icons">
                <img src={img3} alt="" />
                <h3>chi nhánh của chúng tôi</h3>
              </div>
              <div className="icons">
                <img src={img4} alt="" />
                <h3>giao hàng miễn phí</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu py-10 dark:bg-gray-900" id="about">
        <h1 className="heading text-6xl font-bold text-center m-10 text-[#A67C6D]">
          Menu
        </h1>
        <div className="row flex flex-col md:flex-row items-center justify-center">
          <div className="content text-center md:text-left md:w-1/2 px-4 md:px-0">
            <h3 className="title text-2xl font-semibold ">Các Món Ngon</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 mr">
              Tại quán cà phê của chúng tôi, chúng tôi tự hào phục vụ nhiều loại
              đồ uống và món ăn nhẹ hấp dẫn. Dù bạn đang muốn thưởng thức một
              tách trà mát lạnh, một ly cà phê đậm đà hay một món ngọt ngào,
              chúng tôi đều có thứ gì đó dành cho bạn!
            </p>
            <ul className="flex flex-wrap justify-center space-x-8 gap-4">
              <li className="text-2xl mb-4 flex items-center">
                ☕ Best Seller: Cà Phê Đặc Biệt
              </li>
              <li className="text-2xl mb-4 flex items-center">
                🍵 Trà Sữa: Trà Sữa Nguyên Chất
              </li>
              <li className="text-2xl mb-4 flex items-center">
                🍰 Bánh Ngọt: Bánh Ngọt Mới Ra Lò
              </li>
              <li className="text-2xl mb-4 flex items-center">
                🥤 Đá Xay: Đồ Uống Đá Xay
              </li>
              <li className="text-2xl mb-4 flex items-center">
                🍪 Bánh Quy: Bánh Quy Tự Làm
              </li>
            </ul>
          </div>
          <div className="imageMenu flex justify-center md:w-1/2 mt-6 md:mt-0 px-4 md:px-0">
            <img
              src={img5}
              alt="Món Ăn"
              className="max-w-[80%] h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="portfolio dark:bg-gray-900">
        <div className="container">
          <div className="text-center bg-light dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="heading text-4xl m-5 text-[#A67C6D] font-bold">
              Các khuyến mãi
            </h1>
          </div>
          <div className="portfolio_content">
            <div className="portfolio_item">
              <img src={imgPort4} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Đặt Ngay</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
            <div className="portfolio_item">
              <img src={imgPort1} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Coffee Special</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
            <div className="portfolio_item">
              <img src={imgPort6} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Coffee Break</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
            <div className="portfolio_item">
              <img src={imgPort5} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Just for you</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
            <div className="portfolio_item">
              <img src={imgPort3} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Kim Cúc Mọc Tê</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
            <div className="portfolio_item">
              <img src={imgPort2} alt />
              <div className="portfolio_overlay">
                <div className="overlay_text">
                  <h3>Coffee Time</h3>
                  <span>By Coffee Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
