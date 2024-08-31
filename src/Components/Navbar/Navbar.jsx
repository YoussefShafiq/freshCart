import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/CartContext'
import Sidebar from '../Sidebar/Sidebar'

export default function Navbar() {

  let { userData, setUserData } = useContext(UserContext)
  let { cartItems, setCartItems } = useContext(CartContext)


  const [toggleNav, setToggleNav] = useState(false)
  function navtoggle() {
    setToggleNav(!toggleNav)
    console.log(toggleNav);
  }

  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

  return <>
    <nav className="bg-gray-200 z-50 fixed top-0 inset-x-0 md:py-2 text-center capitalize px-3 md:px-0">
      <div className="container flex justify-between items-center text-gray-500">
        <div className="flex justify-between items-center w-full md:w-fit">
          <NavLink to="">
            <img src={logo} width={120} alt="" />
          </NavLink>
          <button onClick={navtoggle} className="md:hidden">
            <i className="fa-solid fa-bars text-3xl p-2"></i>
          </button>
        </div>
        <div className="hidden md:flex space-x-3">
          {userData && (
            <ul className="md:flex space-x-2">
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="wishlist">Wishlist</NavLink></li>
              <li><NavLink to="categories">Categories</NavLink></li>
              <li><NavLink to="brands">Brands</NavLink></li>
              <li><NavLink to="allorders">All Orders</NavLink></li>
            </ul>
          )}
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-2">
            {!userData && (
              <>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="register">Register</NavLink></li>
              </>
            )}
            {userData && (
              <>
                <NavLink to="cart">
                  <div className="relative inline-flex items-center p-2 text-sm font-medium text-sky-500">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    <div className="absolute w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">{cartItems?.numOfCartItems}</div>
                  </div>
                </NavLink>
                <button onClick={() => logout()} className="text-red-600">Logout</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <Sidebar toggleNav={toggleNav} userData={userData} cartItems={cartItems} logout={logout} />
  </>

}
