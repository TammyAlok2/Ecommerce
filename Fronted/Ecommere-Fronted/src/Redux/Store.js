import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import shopSliceReducer from "./Slices/ShopSlice";

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        shop:shopSliceReducer
    },
    devTools:true
})

export default store 