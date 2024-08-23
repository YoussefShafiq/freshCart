import React, { useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {




  return <>
    <Navbar />
    <div className="container pt-16 min-h-[70vh]">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
