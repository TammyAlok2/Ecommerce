import React from 'react'
import {createBrowserRouter ,RouterProvider} from 'react-router-dom'


import UserLogin from './Components/UserLogin.jsx'
import Dashboard from './Pages/AdminPages/Dashboard/Dashboard.jsx'
import AdminSignUp from './Components/AdminSignUp.jsx'
import ShopListPage from './Pages/AdminPages/Dashboard/ShopListPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import NotFound from './Pages/NotFound.jsx'
import AddShop from './Pages/AdminPages/Dashboard/AddShop.jsx'
import ShopDescription from './Components/ShopDescription.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/signUp",
      element:<AdminSignUp/>
    },
    {
path:"/login",
element:<UserLogin/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
path:'/dashboard/allShop',
element:<ShopListPage/>
    },
    {
path:'/home',
element:<HomePage/>
    },
    {
      path:'/shops',
      element:<ShopListPage/>
    },
    {
      path:'/Shops/description',
      element:<ShopDescription/>

    },
    {
      path:'/shop/Create',
      element:<AddShop/>
    },





  {
    path:'*',
    element:<NotFound/>
  }
  
  ])
  return (

<>


   <RouterProvider router = {router}/>

  </>
    
  )
}
export default App
