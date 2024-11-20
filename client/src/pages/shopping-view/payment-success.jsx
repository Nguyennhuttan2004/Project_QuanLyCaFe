import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Thêm CardContent
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import paymentSuccess from "./../../assets/animations/Animation - paymentSuccessful.json"
function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500"> {/* Thêm gradient nền */}
      <Card className="p-10 shadow-2xl rounded-lg bg-white transform transition-all duration-300 hover:scale-105"> {/* Thêm hiệu ứng hover */}
        <CardHeader className="p-0">
          <CardTitle className="text-5xl text-green-700 font-bold">Payment Successful!</CardTitle>
          <Lottie animationData={paymentSuccess} className="w-1/2 h-auto ml-40" /> 
        </CardHeader>
        <CardContent className="text-center"> {/* Thêm CardContent và căn giữa */}
          <p className="mt-4 text-lg text-gray-800">Thank you for your purchase! Your order has been processed successfully.</p> {/* Thay đổi màu sắc */}
        </CardContent>
        <Button onClick={() => navigate("/shop/account")} className="mt-5 bg-green-600 text-white hover:bg-green-700 transition duration-200"> {/* Thay đổi màu nút */}
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;