import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createNewOrder } from "/store/shop/order-slice";
import { CircleDollarSign, CreditCard } from "lucide-react";
import Slider from "@/components/shopping-view/slider";

function ShoppingCheckout({ onPaymentSuccess }) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    setPaymentMethod("paypal");

    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
        onPaymentSuccess(); // Gọi hàm để cập nhật dữ liệu
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  function handleInitiateMomoPayment() {
    setPaymentMethod("momo");

    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "momo",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);

        // Gọi API thanh toán MoMo từ backend
        fetch("http://localhost:5000/api/common/payment/momo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalCartAmount,
            orderInfo: `Order ID: ${data.payload.orderId}`,
            redirectUrl: "http://localhost:5173/shop/payment-success", // Ensure this URL is correct
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result && result.payUrl) {
              window.location.href = result.payUrl; // Chuyển hướng người dùng đến trang thanh toán MoMo
            }
          })
          .catch((error) => {
            toast({
              title: "Thanh toán thất bại",
              variant: "destructive",
            });
          });
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (paymentMethod === "paypal" && approvalURL) {
    window.location.href = approvalURL; // Điều hướng đến PayPal chỉ khi cần thiết
  }

  return (
    <div className="flex flex-col  min-h-screen">
      <div className="w-full  p-6">
        <Slider />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 bg-white rounded-lg shadow-md">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span>${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full flex justify-between">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="flex items-center w-full mr-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200" // Màu xanh biển cho PayPal
            >
              <CircleDollarSign className="mr-2" /> {/* Icon PayPal */}
              {isPaymentStart
                ? "Đang xử lý thanh toán PayPal..."
                : "Thanh toán bằng PayPal"}
            </Button>
            <Button
              onClick={handleInitiateMomoPayment}
              className="flex items-center w-full ml-2 rounded-lg bg-[#B20873] text-white hover:bg-[#A2076A] transition duration-200" // Màu MoMo
            >
              <CreditCard className="mr-2" /> {/* Icon MoMo */}
              {isPaymentStart
                ? "Đang xử lý thanh toán MoMo..."
                : "Thanh toán bằng MoMo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;