import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductSlice from "./admin/products-slice/index.js"
import shopProductSlice from "./shop/products-slice/index.js"
const store = configureStore({
    reducer : {
    auth: authReducer,
    adminProducts : adminProductSlice,
    shopProducts: shopProductSlice
    }
})

export default store;