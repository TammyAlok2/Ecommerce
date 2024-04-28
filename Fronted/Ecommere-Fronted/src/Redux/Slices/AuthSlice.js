import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance'
import axios from "axios";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}



export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
    try {
        const res = axiosInstance .post('user/signUp',data);

        toast.promise(res,{
            loading:"Wait , Creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const loginAccount = createAsyncThunk("/auth/login",async(data)=>{
    try {
        const res = axiosInstance .post("user/signIn",data);
        toast.promise(res,{
            loading:"Wait! your account is logged in ",
            success:(data)=>{
                return data?.data?.message;
            },
            error: "Sign In Failed "
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name : 'auth',
   initialState,
   reducers:{},
   extraReducers:(builder)=>{  builder
    .addCase(loginAccount.fulfilled, (state, action) => {
        console.log('action:', action);
      console.log('action.payload:', action.payload);

        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role
    })
    .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
    })

   }
});

//export const {} = authSlice.actions ; 
export default authSlice.reducer ;