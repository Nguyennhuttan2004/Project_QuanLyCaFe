import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./../../css/footer.css";
import {
  FacebookIcon,
  GithubIcon,
  HousePlug,
  InstagramIcon,
  Mail,
  MapPin,
  MoveRight,
  PhoneIcon,
  Send,
  Upload,
  YoutubeIcon,
} from "lucide-react";
import {
  shoppingViewFooterMenuItems,
} from "@/config";
import { Label } from "../ui/label";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCurrentMenuItem) {
      if (getCurrentMenuItem.id === "products") {
        sessionStorage.removeItem("filters");
      }
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? {
              category: [getCurrentMenuItem.id],
            }
          : null;

      sessionStorage.setItem("filters", JSON.stringify(currentFilter));

      console.log(`Navigating to: ${getCurrentMenuItem.path}`); // Log đường dẫn
      console.log(`Current Filter: ${JSON.stringify(currentFilter)}`);

      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
          )
        : navigate(getCurrentMenuItem.path);
    }

    return (
      <nav className="mb-3 lg:mb-0 lg:items-start gap-2 flex flex-col lg:flex-col">
        {" "}
        {shoppingViewFooterMenuItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-md font-bold cursor-pointer text-[#B89B8D] flex gap-2"
            key={menuItem.id}
          >
            <MoveRight />
            {menuItem.label}
          </Label>
        ))}
      </nav>
    );
  }

  return (
    <footer className="mt-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container">
        <div className="footer_top wow animate__animated animate__fadeInUp bg-white dark:bg-gray-800">
          <div className="footer_text">
            <h2 className="text-[#A67C6D] dark:text-[#D8CFC4]">Subscribe To Our Newsletter</h2>
          </div>
          <div className="footer_form">
            <form action>
              <input type="text" name id placeholder="Your Email Address" className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
              <button className="bg-[#A67C6D] dark:bg-[#D8CFC4] text-white">
                <i />
                <Send />
              </button>
            </form>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
            <div>
              <Link
                to="/shop/home"
                className="flex gap-2 mb-8"
                onClick={handleScrollToTop}
              >
                <HousePlug className="h-10 w-10 text-[#BFA598] text-xl" />{" "}
                <span className="font-extrabold rounded-md text-[#A67C6D] text-4xl">
                  Coffee Shop
                </span>
              </Link>
            </div>
            <ul className="footer_contact">
              <li>
                <i>
                  <PhoneIcon className="ml-2 mt-2 text-[#A67C6D]" />
                </i>
                <span className="text-[#B89B8D] dark:text-gray-200">1800-123-4567 </span>
              </li>
              <li>
                <i>
                  <Mail className="ml-2 mt-2 text-[#A67C6D]" />
                </i>
                <span className="text-[#B89B8D] dark:text-gray-200">info@example.com</span>
              </li>
              <li>
                <i>
                  <MapPin className="ml-2 mt-2 text-[#A67C6D]" />
                </i>
                <span className="text-[#B89B8D] dark:text-gray-200">
                  Huflit Campus HocMon
                  <br />
                  University
                </span>
              </li>
            </ul>
          </div>
          <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
            <h3 className="text-[#A67C6D] dark:text-[#D8CFC4]">Product List</h3>
            <ul className="">
              <i className="mr-2">
                <MenuItems />
              </i>
            </ul>
          </div>
          <div className=" footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
            <h3 className="text-[#A67C6D] dark:text-[#D8CFC4]">Our Services</h3>
            <ul className="">
              <li className="">
                <a
                  href="/shop/about"
                  className=" flex items-center service"
                >
                  <i className="mr-2 ">
                    <MoveRight />
                  </i>
                  About Us
                </a>
              </li>
              <li>
                <a href="/shop/contact" className="flex items-center  service">
                  <i className="mr-2 ">
                    <MoveRight />
                  </i>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_item wow animate__animated animate__fadeInUp animate__delay-1s">
            <h3 className="text-[#A67C6D] dark:text-[#D8CFC4]">Other links</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E0E0E0] dark:bg-gray-700 text-[#3b5998] border border-[#E0E0E0] dark:border-gray-700 hover:text-[#2d4373] transition-colors duration-300 transform hover:scale-110 hover:rotate-3" // Facebook color
              >
                <FacebookIcon className="h-7 w-7" /> {/* Increased size */}
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E0E0E0] dark:bg-gray-700 text-[#E1306C] border border-[#E0E0E0] dark:border-gray-700 hover:text-[#b72a5a] transition-colors duration-300 transform hover:scale-110 hover:rotate-3" // Instagram color
              >
                <InstagramIcon className="h-7 w-7" /> {/* Increased size */}
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E0E0E0] dark:bg-gray-700 text-[#333] border border-[#E0E0E0] dark:border-gray-700 hover:text-[#1a1a1a] transition-colors duration-300 transform hover:scale-110 hover:rotate-3" // GitHub color
              >
                <GithubIcon className="h-7 w-7" /> {/* Increased size */}
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E0E0E0] dark:bg-gray-700 text-[#FF0000] border border-[#E0E0E0] dark:border-gray-700 hover:text-[#cc0000] transition-colors duration-300 transform hover:scale-110 hover:rotate-3" // YouTube color
              >
                <YoutubeIcon className="h-7 w-7" /> {/* Increased size */}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright bg-gray-800 dark:bg-gray-900">
        <div className="container">
          <div className=" text-center py-4">
            <p className="text-gray-400 dark:text-gray-500">
              Copyright © 2024
              <span className="font-bold text-[#A67C6D] m-2">
                Coffee Shop
              </span>{" "}
              Design by Nhựt Tân .
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-2">
              "Điểm đến lý tưởng cho những trải nghiệm cà phê đặc biệt!"
            </p>
          </div>
        </div>
      </div>
      {isVisible && (
        <div className="" id="scrolltop" onClick={scrollToTop}>
          <button className="back_to_top" aria-label="Scroll to top">
            <Upload className="ml-4" />
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
