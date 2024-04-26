// SignUpPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import userContext from '../Context/UserContext.js';
import {useNavigate} from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

function SignUpPage() {
  const { login } = useContext(userContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signIn', formData);
      const { user, token } = response.data;
      login(user, token); // Store user data and token in context
      toast.success('Login Successfully ')
      // Redirect to dashboard or desired page upon successful login
      // Replace the line below with your desired redirect logic
      useNavigate('/Dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      toast.error('Sign Failed ')
    }
  };

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
            <form onSubmit={handleLogin} className="w-full mt-8">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <select  onChange={handleChange} name='role'  className="w-25 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ">
                <option  className='font-medium bg-gray-200'> USER </option>   
                <option> ADMIN </option>   
              </select>
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-3">
                  Login
                </span>
              </button>
              <Toaster/>
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
