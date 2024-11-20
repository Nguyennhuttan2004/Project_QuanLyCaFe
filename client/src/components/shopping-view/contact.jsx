// client/src/components/shopping-view/contact.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Mail, MapPin, PhoneIcon } from "lucide-react";
import { Button } from "../ui/button";

// Đặt icon cho Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const ContactPage = () => {
  const position = [10.762622, 106.660172]; // Tọa độ ví dụ (TP. Hồ Chí Minh)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log(formData);
  };

  return (
    <div className=" bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-5xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">Contact Us</h1>
      <div className="mb-6">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "600px", width: "100%" }}
          className="rounded-lg shadow-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Đây là vị trí của bạn!</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="flex space-x-6 mt-8">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">Thông tin liên hệ</h1>
        <ul className="space-y-4">
  <li className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <PhoneIcon className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
    <span className="text-gray-800 font-semibold">1800-123-4567</span>
  </li>
  <li className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <Mail className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
    <span className="text-gray-800 font-semibold">info@example.com</span>
  </li>
  <li className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <MapPin className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
    <span className="text-gray-800 font-semibold">
      Huflit Campus HocMon
      <br />
      University
    </span>
  </li>
</ul>
        </div>
        <div className="w-2/3">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-300"
          >
                  <h2 className="leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10 text-3xl">Hỗ trợ khách hàng</h2>
            <div>
              <label className="block text-gray-700 font-semibold">
                Your name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                What do you need our support for?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows="4"
              />
            </div>
            <Button
              type="submit"
              className="btn w-full"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
