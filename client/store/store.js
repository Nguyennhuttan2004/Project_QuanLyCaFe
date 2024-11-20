import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"

import adminProductSlice from "./admin/products-slice/index.js"
import adminOrderSlice from "./admin/order-slice/index.js"
import adminUserSlice from "./admin/user-slice/index.js"


import shopProductSlice from "./shop/products-slice/index.js"
import shopCartSlice from "./shop/cart-slice/index.js"
import shopAddressSlice from "./shop/address-slice/index.js"
import shopOrderSlice from "./shop/order-slice/index.js"
import shopSearchSlice from "./shop/search-slice/index.js";
import shopReviewSlice from "./shop/reivew-slice/index.js";
import commonFeatureSlice from "./common/common-slice/index.js";


const store = configureStore({
    reducer : {
    auth: authReducer,
    adminProducts : adminProductSlice,
    adminOrder: adminOrderSlice,
    adminUser:adminUserSlice,

    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    commonFeature: commonFeatureSlice,

    }
})

export default store;