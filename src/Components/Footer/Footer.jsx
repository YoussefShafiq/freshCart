import React, { useState } from 'react'
import style from './Footer.module.css'
import american from '../../assets/logos/AmericanExpress.webp'
import amazonpay from '../../assets/logos/Amazon_Pay-Logo.wine.png'
import paypal1 from '../../assets/logos/paypal-logo-0.png'
import master from '../../assets/logos/masterCard.png'
import appstore from '../../assets/logos/appstore.png'
import googleplay from '../../assets/logos/Googleplay.png'
export default function Footer() {




  return <>

    <div className="bg-gray-100 px-9 py-8 pb-14 flex flex-col">
      <div>
        <h2 className='text-black text-xl'>Get the FreshCart app</h2>
        <p className='text-gray-500'>We will send you a link, open it on your phone to download the app.</p>
      </div>
      <div className='px-3'>
        <div className="flex space-x-3 justify-center items-center my-5">
          <input type="text" name="FooterEmail" placeholder='Email...' className='w-full h-fit py-2 rounded px-3 focus:outline-sky-200' />
          <button className='bg-sky-500 text-sky-50 rounded hover:bg-sky-600 focus:bg-sky-700 h-fit px-2 py-2 w-48  transition-all'>Share app link</button>
        </div>
        <hr />
        <div className="flex justify-between flex-col md:flex-row space-y-3 md:space-y-0 items-center my-1">
          <div className='flex space-x-2 items-center'>
            <h3>Payment Partners</h3>
            <div><img className='w-9' src={amazonpay} alt="amazon pay" /></div>
            <div><img className='w-9' src={american} alt="american Express" /></div>
            <div><img className='w-9' src={paypal1} alt="paypal" /> </div>
            <div><img className='w-9' src={master} alt="masterCard" /></div>
          </div>
          <div className='flex space-x-2 items-center'>
            <h2>Get deliveries with FreshCart</h2>
            <div>
              <img className='w-20' src={appstore} alt="App Store" />
            </div>
            <div>
              <img className='w-24 rounded' src={googleplay} alt="Google Play" />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>

  </>
}
