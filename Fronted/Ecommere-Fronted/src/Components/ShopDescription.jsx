import React from 'react'
import { useLocation } from 'react-router-dom'
import HomeLayout from '../Layouts/HomeLayout'

const ShopDescription = () => {

    const ShopDatas = useLocation()
    console.log(ShopDatas)

  return (
    <HomeLayout> 
    <div>
      Welcome to the {ShopDatas?.state?.title}
    </div>
    </HomeLayout>
  )
}

export default ShopDescription
