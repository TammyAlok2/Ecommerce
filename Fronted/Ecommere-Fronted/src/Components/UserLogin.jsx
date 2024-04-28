// SignUpPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginAccount } from '../Redux/Slices/AuthSlice';

import { useNavigate } from 'react-router-dom'

import { Toaster,toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function SignUpPage() {

  const [loginData, setLoginData] = useState({
    email: '',
    passward: '',
    role: ''
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   async function onLogin( event){
event.preventDefault();

if(!loginData.email || !loginData.passward || !loginData.role){
  toast.error("please fill all the details ")
  return 
}

const response = await dispatch(loginAccount(loginData));
if(response?.payload?.success){
  navigate('/dashboard')

  setLoginData({
    email:"",
    passward:"",
    
  })
}

 
}


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png" className="w-32 mx-auto" alt="Logo" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              User Login for Ecommerce
            </h1>
            <form onSubmit={onLogin} className="w-full mt-8" noValidate>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                name="passward"
                value={loginData.passward}
                onChange={handleChange}
                placeholder="Password"
              />
              <select value={loginData.role}  defaultValue="USER"  onChange={handleChange} name='role'  className="w-25 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ">
                <option  className='font-medium bg-gray-200' value="USER"> USER </option>   
                <option value="ADMIN"> ADMIN </option>   
              </select>
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-3">
                  Login
                </span>
              </button>
              
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"}}></div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
