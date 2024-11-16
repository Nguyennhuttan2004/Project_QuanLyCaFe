import { Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import Welcome from "./../../assets/animations/Animation - welcome.json";
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
     
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
      
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
        <Lottie animationData={Welcome} className="w-full h-auto " /> 
         
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
