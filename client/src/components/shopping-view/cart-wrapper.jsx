import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content.jsx";
import { ShoppingCartIcon } from "lucide-react";
import Lottie from "lottie-react";
import cartEmpty from "./../../assets/animations/Animation - cartEmpty.json";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <div className="flex gap-2">
          <ShoppingCartIcon />
          <SheetTitle> Giỏ hàng của bạn</SheetTitle>
        </div>
      </SheetHeader>
      <div className="mt-8 space-y-4 flex flex-col">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} className="" />
          ))
        ) : (
          <Lottie
            animationData={cartEmpty}
            className="w-[40%] h-[40%] ml-32"
          />
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Tổng cộng: </span>
          <span className="font-bold">{totalCartAmount}Đ</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Thanh toán
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;