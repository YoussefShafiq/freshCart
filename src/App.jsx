import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import WishList from './Components/WishList/WishList.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import UserContextProvider from './Context/userContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import toast, { useToaster } from 'react-hot-toast/headless';
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode.jsx'

let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'verifyresetcode', element: <VerifyResetCode /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])

let query = new QueryClient()

function App() {


  return <QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </CartContextProvider>
    </UserContextProvider>
  </QueryClientProvider>

}

export default App
