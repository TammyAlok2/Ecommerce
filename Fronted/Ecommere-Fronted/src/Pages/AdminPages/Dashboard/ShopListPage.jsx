import React, { useEffect, useState } from 'react';
import { Backend_URL } from '../../../../constant.js';

// Sample shop data (replace with your actual data)


const ShopListPage = () => {
const [shops,setShops] = useState([]);

useEffect(()=>{
  const fetchShops = async ()=>{
    try{
      // make a get request to the backend API TO fetch the user's shops
      const userId = '';
      const response  = await fetch(`${Backend_URL}shop/admin/${'662b72fc3869f6e640416466'}`);
      setShops(response.data)
      console.log(response)
      console.log('hello')
    }
    catch (error){
      console.error('Error fetching shops',error)
    }
  }

  fetchShops()
},[])


  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">List of Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={shop.image} alt={shop.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{shop.name}</h2>
              <p className="text-gray-700">{shop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopListPage;
