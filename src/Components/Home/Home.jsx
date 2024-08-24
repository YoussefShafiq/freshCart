import React, { useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import Loading from '../Loading/Loading'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  // Filter products based on search term
  const filteredProducts = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <MainSlider />
      <CategoriesSlider />

      <h1 className='text-3xl my-3'>Recent Products</h1>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 w-[90%] md:w-full border border-gray-300 rounded transition-all outline-none focus:outline-sky-200 focus:outline-[4px] focus:border-transparent"
        />
      </div>

      {!isLoading ? (
        <div className="flex flex-wrap">
          {filteredProducts?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
