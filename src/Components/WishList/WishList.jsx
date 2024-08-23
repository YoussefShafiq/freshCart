import React, { useContext, useState } from 'react'
import style from './WishList.module.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function WishList() {

  let { addToCart } = useContext(CartContext)
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [removingFromListId, setRemovingFromListId] = useState(null);
  const queryClient = useQueryClient();

  let headers = {
    token: localStorage.getItem('userToken')
  }

  function getWishlistItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers
    })
  }

  async function addcartMiddleware(productId) {
    setAddingToCartId(productId)
    await addToCart(productId)
    setAddingToCartId(null)

  }


  let { data, isLoading } = useQuery({
    queryKey: ['getWishlist'],
    queryFn: getWishlistItems
  })

  async function removeFromWishlist(productId) {
    try {
      setRemovingFromListId(productId)
      let data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers
      })
      toast.success(data.data.message, {
        duration: 2000
      })
      console.log(data);
      queryClient.invalidateQueries('getWishlist');
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setRemovingFromListId(null)
    }
  }



  return <>

    <h1 className="text-3xl">WishList <i className="fa-solid fa-heart-circle-check text-xl text-red-600"></i></h1>

    {isLoading ? <Loading /> : <>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.data.map((item) => <tr key={item.id} className="bg-white border-b hover:bg-gray-50 ">
              <td className="p-4">
                <Link to={`/productdetails/${item.id}`}>
                  <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-900 w-full space-y-2">
                <div className=' font-semibold text-gray-900 '>{item.title}</div>
                <div className='text-gray-400 '>{item.price} EGP</div>
                <button onClick={() => removeFromWishlist(item.id)} className="font-medium text-red-600  hover:underline">{removingFromListId === item.id ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Remove'}</button>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => addcartMiddleware(item.id)} className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-max ">{addingToCartId === item.id ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'add to cart'}</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>}


  </>
}
