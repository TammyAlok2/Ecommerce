import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import {toast} from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance";

const data =JSON.parse(localStorage.getItem("data"))
const userId = data?._id;


const initialState ={
    shopData:[]
}

export const getAllShops = 
createAsyncThunk("/shop/get",async()=>{
    try {
        const  response = axiosInstance.get(`shop/admin/${userId}`);
        toast.promise(response,{
            loading:"loading All shops ",
            success:"Shops loaded successfully ",
            error:"Failed to get the shops"
        })
        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const addNewShop = createAsyncThunk("/shop/add",async(data)=>{
    try {
        const res = axiosInstance.post('shop/',data);

        toast.promise(res,{
            loading:"Wait , Creating your Shop",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to create Shop"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const getProductByShopId = 
createAsyncThunk("/shop/product/get",async()=>{
    try {
        const  response = axiosInstance.get(`shop/${shopId}`);
        toast.promise(response,{
            loading:"loading All Products ",
            success:"Shops loaded successfully ",
            error:"Failed to get the Products"
        })
        return (await response)?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

const shopSlice = createSlice({
    name:"shops",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllShops.fulfilled, (state, action) => {
            if(action.payload) {
                console.log(action.payload)
               state.shopData =[...action.payload ]
            }
        })
    }
})

export default shopSlice.reducer