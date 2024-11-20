import Lottie from "lottie-react";
import notFound from "./../../assets/Animation - 404.json";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  ">
            <h1 className="text-6xl mb-2 font-extrabold ">404</h1>
            <p className="text-2xl">Oops! Page Not Found</p>
            <a href="/" className="mt-4 px-4 py-2 bg-gradient-to-r from-[#f8ae56] to-[#f55f8d] text-white font-bold rounded-lg hover:opacity-80 transition-opacity">
                Go Back Home
            </a>
            <Lottie animationData={notFound} className="w-1/2 h-auto" />
           
        </div>
    );
}

export default NotFound;