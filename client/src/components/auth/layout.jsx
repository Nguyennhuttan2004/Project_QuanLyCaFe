import { Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import Welcome from "./../../assets/animations/Animation - welcome.json";
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100"> 
     
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-white shadow-lg">
      
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
        <Lottie animationData={Welcome} className="w-full h-auto " /> 
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 bg-[#886559]"> 
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
