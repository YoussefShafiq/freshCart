import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
  console.log(data?.data.data);
  // Filter products based on search term
  const filteredProducts = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return <>

    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2  w-full border border-gray-300 rounded transition-all outline-none focus:outline-sky-200 focus:outline-[4px] focus:border-transparent"
    />

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
}
