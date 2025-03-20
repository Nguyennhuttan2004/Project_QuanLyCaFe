// client/src/components/shopping-view/contact.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Mail, MapPin, PhoneIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

// Đặt icon cho Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo thành công
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state cho thông báo lỗi

  const position = [10.8915, 106.5945];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // gọi api hỗ trợ khách hàng
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation dữ liệu nhập
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Tất cả các trường đều là bắt buộc!"); // Hiển thị thông báo lỗi
      return;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Địa chỉ email không hợp lệ!"); // Hiển thị thông báo lỗi
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/support",
        formData
      );
      console.log("Support request sent:", response.data);
      setFormData({ name: "", email: "", message: "" });
      setSuccessMessage("Gửi yêu cầu hỗ trợ thành công!"); // Hiển thị thông báo thành công
      setErrorMessage(""); // Xóa thông báo lỗi nếu có

      // Ẩn thông báo sau 2 giây
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.log("Error sending support request:", error);
      setErrorMessage("Gửi yêu cầu hỗ trợ thất bại!"); // Hiển thị thông báo lỗi
      setSuccessMessage(""); // Xóa thông báo thành công nếu có
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
          {errorMessage}
        </div>
      )}
      <h1 className="text-5xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
        Contact Us
      </h1>
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
        <div className="w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h1 className="text-3xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
            Thông tin liên hệ
          </h1>
          <ul className="space-y-4">
            <li className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <PhoneIcon className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">1800-123-4567</span>
            </li>
            <li className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Mail className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                info@example.com
              </span>
            </li>
            <li className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <MapPin className="ml-2 mt-2 text-[#A67C6D] w-6 h-6" />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">
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
            className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
          >
            <h2 className="leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10 text-3xl">
              Hỗ trợ khách hàng
            </h2>
            {successMessage && (
              <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg mb-4">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
                {errorMessage}
              </div>
            )}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold">
                Your name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold">
                What do you need our support for?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows="4"
              />
            </div>
            <Button type="submit" className="btn w-full">
              Gửi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
