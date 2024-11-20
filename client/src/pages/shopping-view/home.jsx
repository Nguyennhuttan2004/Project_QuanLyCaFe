import bannerOne from "../../assets/banner-1.jpg";
import bannerTwo from "../../assets/Thiết kế chưa có tên.png";
import bannerThree from "../../assets/Black Simple Coffee Landscape Banner.png";
import { Button } from "@/components/ui/button";
import {
  CakeSlice,
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideCoffee,
  MilkIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "/store/shop/products-slice";
import { addToCart, fetchCartItems } from "/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import "./../../css/video.css";
import videoSource from "./../../assets/coffeeshop.mp4";
import imageVideo from "./../../assets/videoimage.jpg";
import { getFeatureImages } from "/store/common/common-slice";
import About from "@/components/shopping-view/about";

const categories = [
  { id: "bestSeller", label: "Best Seller", icon: LucideCoffee },
  { id: "traSua", label: "Trà Sữa", icon: MilkIcon },
  { id: "caPhe", label: "Cà Phê", icon: LucideCoffee },
  { id: "banhNgot", label: "Bánh Ngọt", icon: CakeSlice },
  { id: "daXay", label: "Đá Xay", icon: LucideCoffee },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // const slides = [bannerOne, bannerTwo, bannerThree];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { category: [] },
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages()).then((response) => {
      console.log("Feature Image List Response:", response);
    });
  }, [dispatch]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  console.log("Feature Image List:", featureImageList);
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <div className="p-10">
      <div className=" relative w-full h-[600px] overflow-hidden ">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((slide, index) => (
              <img
                src={slide?.image} // Đảm bảo rằng slide.image có giá trị hợp lệ
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                alt={`Banner ${index + 1}`} // Thêm alt cho hình ảnh
              />
            ))
          ) : (
            <p className="text-center">Không có hình ảnh nào để hiển thị.</p> // Thông báo nếu không có hình ảnh
          )}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-9xl uppercase text-custom-gray text-center relative mb-10">
              Danh mục
              <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-3xl text-[#A67C6D] font-bold">
                Sản phẩm
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((categoryItem) => (
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-9xl uppercase text-custom-gray text-center relative mb-10">
              Sản phẩm
              <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-3xl text-[#A67C6D] font-bold">
                Best seller
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0 ? (
                productList.map((productItem) => {
                  return productItem.category === "bestSeller" ? (
                    <div className="border-2 border-brown-600 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                      <ShoppingProductTile
                        key={productItem.id}
                        handleGetProductDetails={handleGetProductDetails}
                        product={productItem}
                        handleAddtoCart={handleAddtoCart}
                      />
                    </div>
                  ) : null;
                })
              ) : (
                <p className="text-center">
                  Không có sản phẩm nào trong danh mục Best Seller.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="digital py-12">
          <div className="container">
            <div className="digital_title">
              <p className="sub_title">HOW DO WE WORKS</p>
              <h2>DIGITAL EXPERIENCE</h2>
              <p>
                We are committed to providing our customers with exceptional
                service while offering our <br />
                employees the best training.
              </p>
            </div>
            <div className="digital_content">
              {/* Kiểm tra đường dẫn video và đảm bảo nó chính xác */}
              <video
                poster={imageVideo}
                muted
                controls
                preload="auto"
                src={videoSource} // Sử dụng require để đảm bảo đường dẫn chính xác
                onError={(e) => {
                  console.error("Video failed to load:", e);
                }}
              />
            </div>
          </div>
        </section>

        <section className="">
          <About />
        </section>

        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}
export default ShoppingHome;
