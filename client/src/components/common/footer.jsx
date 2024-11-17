import React from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ borderTop: "1px solid #dddddd", background: "#f7f7f7", width: "100%" }}>
      <div
        className=" sm:px-6 md:px-10 lg:px-20 "
      >
        <div className="grid md:grid-cols-3 md:gap-x-2">
        </div>
      </div>
      <div style={{ borderTop: "1px solid #dddddd", background: "#f7f7f7" }}>
        <section className="sm:px-6 md:px-10 lg:px-20">
          <div className="2xl:flex 2xl:justify-between flex justify-between py-6">
            <div className="md:text-center lg:text-left flex items-center">
              <div className="lg:p-1 lg:-m-1 lg:overflow-hidden flex items-center">
                <div className="text-sm leading-5">
                  <p>© 2024 Airbnb, Inc.</p>
                </div>
                <div className="flex items-center ml-2">
                  <ol className="inline-flex space-x-2 ml-2">
                    <li className="hover:underline text-sm">
                     a
                    </li>
                    <li className="hover:underline text-sm">
                      b
                    </li>
                    <li className="hover:underline text-sm">
                      c
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="ml-6">
                <ul className="flex m-0 p-0">
                  <li className="ml-6">
                    <FacebookIcon/>
                  </li>
                  <li className="ml-6">
                    <InstagramIcon/>
                  </li>
                  <li className="ml-6">
                    <YoutubeIcon/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
