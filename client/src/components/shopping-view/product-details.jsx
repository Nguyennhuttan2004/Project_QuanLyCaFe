import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "/store/shop/cart-slice";
import { setProductDetails } from "/store/shop/products-slice";


function ProductDetailsDialog({ open, setOpen, productDetails }) {

  const dispatch = useDispatch()
  const {toast} = useToast()
  const {user} = useSelector(state => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart); 



  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Chỉ còn ${getQuantity} sản phẩm cho mặt hàng này`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Sản phẩm đã được thêm vào giỏ hàng",
        });
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    // setRating(0);
    // setReviewMsg("");
  }


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold text-black  ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-3xl font-bold text-red-500">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div >
          <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary"/>
                  <StarIcon className="w-5 h-5 fill-primary"/>
                  <StarIcon className="w-5 h-5 fill-primary"/>
                  <StarIcon className="w-5 h-5 fill-primary"/>
                  <StarIcon className="w-5 h-5 fill-primary"/>
                </div>
                <span>(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
               Hết hàng
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Thêm sản phẩm
              </Button>
            )}
          </div>
         <Separator/>
           <div className="max-h-[300px] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarFallback>
                  Sm
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1 ">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">abc</h3>
                </div>

                <p>aaaa</p>
              </div>
            </div>
             <div className="mt-6 flex gap-2">
              <Input
              placeholder = "Hãy viết đánh giá của bạn ..."/>
              <Button>Gửi</Button>
             </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
