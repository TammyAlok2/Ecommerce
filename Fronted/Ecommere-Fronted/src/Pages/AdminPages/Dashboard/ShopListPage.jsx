import React, { useEffect, useState } from 'react';
import { getAllShops } from '../../../Redux/Slices/ShopSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import HomeLayout from '../../../Layouts/HomeLayout.jsx';
import ShopCard from '../../../Components/ShopCard.jsx'
// Sample shop data (replace with your actual data)


const ShopListPage = () => {
const[shops,setShop] = useState([])
  const dispatch = useDispatch();

  const {shopData} = useSelector((state)=>state.shop)
  console.log(shopData)

  async function loadShops(){
    await dispatch(getAllShops());
  }

  useEffect(()=>{
    loadShops();
  },[])


  return (
    <HomeLayout>
    <div className=" ">
      <h1 className="text-3xl font-bold mb-8">List of Shops</h1>
      <div className="flex mx-10 gap-10  flex-wrap m-10 p-10">
{
  shopData?.map((element)=>{
    return<ShopCard key={element._id} data={element}/>
  })
}
      </div>
    </div>
    </HomeLayout>
  );
};

export default ShopListPage;
