import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/CartContext'

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

    <nav className='bg-gray-200 z-50 fixed top-0 inset-x-0 md:py-2 text-center capitalize'>
      <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
        <div className='flex justify-between items-center space-x-52'>
          <NavLink to=""><img src={logo} width={120} alt="" /></NavLink>
          <button onClick={() => { navtoggle() }} className='md:hidden'>
            <i className="fa-solid fa-bars text-3xl p-2"></i>
          </button>
        </div>
        <div className='flex flex-col md:flex-row space-x-3'>
          {userData && <ul className={`md:flex flex-col md:flex-row space-x-2 ${toggleNav ? 'flex' : 'hidden'}`}>
            <li><NavLink to="">Home</NavLink></li>
            <li><NavLink to="products">products</NavLink></li>
            <li><NavLink to="wishlist">wishList </NavLink></li>
            <li><NavLink to="categories">categories</NavLink></li>
            <li><NavLink to="brands">brands</NavLink></li>
          </ul>}
        </div>
        <div className={`md:block ${toggleNav ? 'block' : 'hidden'} `}>

          <ul className='flex flex-col md:flex-row items-center space-x-2'>


            {!userData && <>
              <li><NavLink to="login">Login</NavLink></li>
              <li><NavLink to="register">Register</NavLink></li>
            </>}

            {userData && <>
              <NavLink to="cart">
                <div type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 ">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full -top-[0.5px] -end-[0.5px] ">{cartItems?.numOfCartItems}</div>
                </div>
              </NavLink>
              <button onClick={() => logout()}> <li><span className='text-red-600' >Logout</span></li></button>
            </>}
          </ul>
        </div>
      </div>
    </nav>

  </>
}
