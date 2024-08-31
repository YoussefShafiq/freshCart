import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'

export default function Brands() {

  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectingBrand, setSelectingBrand] = useState(false)
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!selectedBrand) return;
    setIsClosing(false);
  }, [selectedBrand]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setSelectedBrand(null), 200);
  };



  function allBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data, isLoading } = useQuery({
    queryKey: ['allBrands'],
    queryFn: allBrands
  })

  async function getSpecificBrand(brandId) {
    setSelectingBrand(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    setSelectingBrand(false)
    setSelectedBrand({ image: data.data.image, name: data.data.name })
    console.log(data.data);
  }





  return <>

    <h1 className="text-3xl  text-center">Brands</h1>
    <div className='flex flex-wrap justify-center p-3'>
      {isLoading ? <Loading /> : (
        <>
          {data.data.data.map((brand) => (
            <div className='w-1/2 md:w-1/6 p-1 md:p-5 m-0 md:m-0 text-center' key={brand._id}>
              <button onClick={() => getSpecificBrand(brand._id)} >
                <div className='group bg-white hover:border-sky-500 hover:shadow-md hover:scale-105 duration-200 border border-transparent rounded-md relative overflow-hidden hover:shadow-sky-200'>
                  <img src={brand.image} className='w-full' alt="" />
                  <h2 className='p-2 text-center text-xl'>{brand.name}</h2>
                </div>
              </button>
            </div>
          ))}
        </>
      )}
    </div>

    {selectingBrand ? <div className={`inset-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-35 fixed fade-in `}><Loading /> </div> : ''}

    {selectedBrand ? <div onClick={() => handleClose()} className={`fixed bg-black bg-opacity-35 inset-0 w-screen h-screen grid ${isClosing ? 'fade-out' : ''}`}>
      <div onClick={(e) => e.stopPropagation()} className={` bg-white w-fit h-fit m-auto p-4 rounded-lg relative slide-down ${isClosing ? 'slide-up' : 'slide-down'} `}>
        <div className="absolute top-0 right-0 p-3"><button onClick={() => handleClose()} className="fa-solid fa-xmark text-3xl hover:text-sky-600 transition-all"></button></div>
        <div className="flex">
          <div>
            <img src={selectedBrand.image} alt={selectedBrand.name} />
          </div>
        </div>
      </div>
    </div> : null}
  </>
}
