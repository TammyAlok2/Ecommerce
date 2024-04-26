import React from 'react'
import {createBrowserRouter ,RouterProvider} from 'react-router-dom'

import UserLogin from './Components/UserLogin.jsx'
import Dashboard from './Pages/AdminPages/Dashboard/Dashboard.jsx'
import AdminSignUp from './Components/AdminSignUp.jsx'
import ShopListPage from './Pages/AdminPages/Dashboard/ShopListPage.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<UserLogin/>
    },
    {
      path:"/signUp",
      element:<AdminSignUp/>
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

    }
  
  ])
  return (

<>
   <RouterProvider router = {router}/>
  </>
    
  )
}
export default App
