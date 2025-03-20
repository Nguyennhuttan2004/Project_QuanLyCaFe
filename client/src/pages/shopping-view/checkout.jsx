import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createNewOrder } from "/store/shop/order-slice";
import { CircleDollarSign, CreditCard } from "lucide-react";
import Slider from "@/components/shopping-view/slider";

function ShoppingCheckout({ onPaymentSuccess = () => {} }) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;

  function handleInitiatePayment(paymentMethod) {
    if (!cartItems || cartItems.items.length === 0) {
      toast({ title: "🛑 Giỏ hàng trống. Vui lòng thêm sản phẩm!", variant: "destructive" });
      return;
    }
    if (!currentSelectedAddress) {
      toast({ title: "🛑 Chọn địa chỉ để tiếp tục!", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressId: currentSelectedAddress?._id, // ✅ Gửi đúng `addressId`
      orderStatus: "pending",
      paymentMethod: paymentMethod, // ✅ Fix gửi đúng định dạng
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
    };

    console.log("📤 Debug Order Data trước khi gửi:", orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        if (typeof onPaymentSuccess === "function") {
          onPaymentSuccess();
        }

        if (paymentMethod === "paypal" && data.payload.approvalURL) {
          window.location.href = data.payload.approvalURL;
        } else if (paymentMethod === "momo") {
          fetch("http://localhost:5000/api/common/payment/momo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: totalCartAmount,
              orderInfo: `Order ID: ${data.payload.orderId}`,
              redirectUrl: "http://localhost:5173/shop/payment-success",
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result?.payUrl) {
                window.location.href = result.payUrl;
              } else {
                toast({ title: "MoMo payment failed.", variant: "destructive" });
              }
            })
            .catch(() => {
              toast({ title: "MoMo payment error.", variant: "destructive" });
            });
        }
      } else {
        setIsPaymentStart(false);
        toast({ title: "❌ Tạo đơn hàng thất bại!", variant: "destructive" });
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full p-6">
        <Slider />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 bg-white rounded-lg shadow-md">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? cartItems.items.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />) : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full flex justify-between">
            <Button onClick={() => handleInitiatePayment("paypal")} disabled={isPaymentStart} className="flex items-center w-full mr-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
              <CircleDollarSign className="mr-2" />
              {isPaymentStart ? "Processing PayPal Payment..." : "Pay with PayPal"}
            </Button>
            <Button onClick={() => handleInitiatePayment("momo")} className="flex items-center w-full ml-2 rounded-lg bg-[#B20873] text-white hover:bg-[#A2076A] transition duration-200">
              <CreditCard className="mr-2" />
              {isPaymentStart ? "Processing MoMo Payment..." : "Pay with MoMo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
