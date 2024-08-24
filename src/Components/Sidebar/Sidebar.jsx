import React, { useState } from 'react'
import style from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ toggleNav, userData, cartItems, logout }) {




  return <>

    <div className={`fixed inset-0 bg-opacity-75 z-40 transform ${toggleNav ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
      <div className="flex flex-col p-4 space-y-6 bg-gray-200 text-gray-500 w-64 h-full">
        <button onClick={toggleNav} className="self-end text-2xl">
          &times;
        </button>
        <ul>
          {userData && (
            <>
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="wishlist">Wishlist</NavLink></li>
              <li><NavLink to="categories">Categories</NavLink></li>
              <li><NavLink to="brands">Brands</NavLink></li>
            </>
          )}
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
                  <div className="absolute w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 text-center -right-1">{cartItems?.numOfCartItems}</div>
                </div>
              </NavLink>
            </>
          )}
        </ul>
        <button onClick={logout} className="text-red-600">Logout</button>
      </div>
    </div>

  </>
}
