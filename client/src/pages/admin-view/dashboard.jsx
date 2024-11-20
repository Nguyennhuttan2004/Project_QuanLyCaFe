import React, { useEffect, useState } from "react";
import SalesChart from "@/components/common/saleChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { getTotalUsers } from "/store/auth-slice";
import { getTotalRevenue } from "/store/auth-slice";
import { getSalesPerMonth } from "./../../../store/admin/order-slice/index.js";
import { getTotalOrders } from "/store/admin/order-slice";

function AdminDashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [adminCount, setAdminCount] = useState(0); // State for admin count
  const [userCount, setUserCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchTotalUsers = async () => {
    try {
      const response = await dispatch(getTotalUsers());
      if (response.payload) {
        setAdminCount(response.payload.admins); // Set admin count
        setUserCount(response.payload.regularUsers); // Set regular user count
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await dispatch(getTotalOrders());
      if (response.payload) {
        setTotalOrders(response.payload.totalOrders); // Kiểm tra payload
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Error fetching total orders:", error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await dispatch(getTotalRevenue());
      if (response.payload) {
        setTotalRevenue(response.payload.totalRevenue); // Kiểm tra payload
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const fetchSalesPerMonth = async () => {
    try {
      const response = await dispatch(getSalesPerMonth());
      if (response.payload) {
        console.log("Sales data response:", response.payload); // Log the response
        setSalesData(response.payload.data); // Cập nhật dữ liệu doanh thu tháng mới
        console.log("Updated sales data:", response.payload.data); // Log updated sales data
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };
  
  const fetchData = async () => {
    await fetchTotalUsers();
    await fetchTotalOrders();
    await fetchTotalRevenue();
    await fetchSalesPerMonth();
  };

  const handlePaymentSuccess = async () => {
    await fetchTotalRevenue();
    await fetchTotalOrders(); // Gọi lại API để lấy tổng số đơn hàng mới
    await fetchSalesPerMonth(); // Gọi lại API để lấy doanh thu mới
  };
  

  useEffect(() => {
    if (salesData.length > 0) {
      console.log("Sales data updated:", salesData); // Debug
    }
  }, [salesData]); // Khi salesData thay đổi, cập nhật lại biểu đồ
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <Separator className="bg-gray-300 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader className="flex flex-row justify-between items-center p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Tổng doanh thu
            </CardTitle>
            <CircleDollarSign className="text-green-500" />
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-gray-800">{totalRevenue} VND</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader className="flex flex-row justify-between items-center p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Tổng đơn đặt hàng
            </CardTitle>
            <ShoppingBag className="text-blue-500" />
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader className="flex flex-row justify-between items-center p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Tổng số Account
            </CardTitle>
            <UserRound className="text-purple-500" />
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-xl font-bold text-gray-800">
              Admin: {adminCount} | User: {userCount}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10 bg-white shadow-md rounded-lg">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Biểu đồ bán hàng ($)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <SalesChart
            data={salesData}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
