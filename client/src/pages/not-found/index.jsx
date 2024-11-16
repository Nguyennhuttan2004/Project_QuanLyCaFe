import Lottie from "lottie-react";
import notFound from "./../../assets/Animation - 404.json";

function NotFound() {
    return (
        <div>
            <h1 className="text-5xl font-extrabold mr-10">404</h1>
            <Lottie animationData={notFound} className="w-1/2 h-auto  ms-72" /> 
        </div>
      
    );
}
export default NotFound;