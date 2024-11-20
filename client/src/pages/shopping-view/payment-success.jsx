import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Thêm CardContent
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import paymentSuccess from "./../../assets/animations/Animation - paymentSuccessful.json"
function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <Card className="p-10 shadow-2xl rounded-lg bg-white transform transition-all duration-300 hover:scale-105 flex flex-col items-center"> {/* Thêm flex để căn giữa */}
        <CardHeader className="p-0 flex flex-col items-center"> {/* Căn giữa nội dung trong CardHeader */}
            <CardTitle className="text-5xl text-green-700 font-bold text-center">Payment Successful!</CardTitle>
            <Lottie animationData={paymentSuccess} className="w-1/2 h-auto" /> 
        </CardHeader>
        <CardContent className="text-center"> {/* Căn giữa nội dung trong CardContent */}
            <p className="mt-4 text-lg text-gray-800">Thank you for your purchase! Your order has been processed successfully.</p>
        </CardContent>
        <Button 
            onClick={() => navigate("/shop/account")} 
            className="mt-5 bg-green-600 text-white hover:bg-green-700 transition duration-200"
        >
            View Orders
        </Button>
    </Card>
</div>
  );
}

export default PaymentSuccessPage;