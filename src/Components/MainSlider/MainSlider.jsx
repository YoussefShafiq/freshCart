import React, { useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from '../../assets/images/slider-image-3.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-1.jpeg'


export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true
  };



  return <>


    <div className="flex">
      <div className="w-3/4">
        <Slider {...settings}>
          <img src={slide1} alt="" className='w-full md:h-[400px] h-[200px]' />
          <img src={slide2} alt="" className='w-full md:h-[400px] h-[200px]' />
          <img src={slide3} alt="" className='w-full md:h-[400px] h-[200px]' />
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slide1} alt="" className='w-full md:h-[200px] h-[100px]' />
        <img src={slide3} alt="" className='w-full md:h-[200px] h-[100px]' />
      </div>
    </div>


  </>
}
