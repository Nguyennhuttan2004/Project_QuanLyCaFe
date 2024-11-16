import Lottie from "lottie-react"
import Unauth from "./../../assets/Animation - 404.json"

function UnauthPage(){
    return (
        <div>
        <h1 className="text-5xl font-extrabold mr-10">404</h1>
        <Lottie animationData={Unauth} className="w-1/2 h-auto  ms-72" /> 
    </div>
    )
}
export default UnauthPage