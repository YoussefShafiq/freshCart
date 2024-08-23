import React, { useState } from 'react'
import style from './Notfound.module.css'
import notfoundImage from '../../assets/images/404 Error Page not Found with people connecting a plug-amico.png'

export default function Notfound() {




  return <>

    <div className='flex justify-center'>
      <img src={notfoundImage} className='w-1/2' alt="" />
    </div>

  </>
}
