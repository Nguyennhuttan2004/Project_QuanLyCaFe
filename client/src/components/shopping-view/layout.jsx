import { Outlet } from "react-router-dom"
import ShoppingHeader from "./header"
import AuthFooter from "../common/footer"

function ShoppingLayout() {
    return(

        <div className="flex flex-col bg-white overflow-hidden">
            <ShoppingHeader/>           
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
            {/* <AuthFooter/> */}
        </div> 
    )
}

export default ShoppingLayout