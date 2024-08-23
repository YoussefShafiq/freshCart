import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,

        }
      }
    ]
  };


  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }


  let { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })





  return <>

    {!isLoading ? <Slider {...settings}>
      {data?.data.data?.map((category, index) => <div key={index} className='cursor-pointer mt-5'>
        <img src={category.image} alt="" className='w-full aspect-square' />
        <h3>{category.name}</h3>
      </div>)}
    </Slider> : ''}

  </>
}
