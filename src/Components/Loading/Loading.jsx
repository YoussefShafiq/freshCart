import React, { useState } from 'react'
import style from './Loading.module.css'
import { ThreeDots } from 'react-loader-spinner'
import loadingCart from '../../assets/Shopping cart.gif'

export default function Loading() {




  return <>

    <div className="flex justify-center py-36">
      <img src={loadingCart} alt="" />
      {/* <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#09c"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
    </div>

  </>
}
