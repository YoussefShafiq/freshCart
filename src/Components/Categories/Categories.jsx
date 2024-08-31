import React, { useState } from 'react'
import style from './Categories.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [loadingSubCat, setLoadingSubCat] = useState(false)

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  async function getSpecificSubcategory(categoryId, categoryname) {
    try {
      setLoadingSubCat(true)
      setSelectedCategory(categoryname)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
      setSubCategories(data.data)
      setLoadingSubCat(false)
    } catch (error) {
      console.log(error);
    }

  }

  let { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })




  return (
    <>
      <h1 className="text-3xl  text-center">Categories</h1>
      <div className='flex flex-wrap justify-center'>
        {categoriesLoading ? <Loading /> : (
          <>
            {categoriesData.data.data.map((category) => (
              <div className='w-1/2 md:w-1/6 p-5 m-0 md:m-0' key={category._id}>
                <button onClick={() => getSpecificSubcategory(category._id, category.name)}>
                  <div className='group bg-white hover:border-sky-500 hover:shadow-md hover:scale-105 duration-200 border border-transparent rounded-md relative overflow-hidden hover:shadow-sky-200'>
                    <img src={category.image} className='w-full aspect-square' alt="" />
                    <h2 className='p-2 text-center text-xl'>{category.name}</h2>
                  </div>
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {subCategories.length > 0 ? <><h1 className="text-3xl">{selectedCategory} SubCategories</h1>
        {loadingSubCat ? <Loading /> : <div className='flex flex-wrap'>
          {subCategories.map((subcategory) => <div className='w-full md:w-1/3 p-3 md:m-0 text-center '>
            <div className='shadow-md py-7 rounded-md shadow-sky-100'>{subcategory.name}</div>
          </div>)}
        </div>}</> : ''}





    </>
  )
}
