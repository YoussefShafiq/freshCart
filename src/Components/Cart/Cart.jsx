import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Cart() {

  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);


  const [cart, setCart] = useState(null)

  const { getCartItems, updateProduct, deleteProduct } = useContext(CartContext)

  async function getCart() {
    let respnose = await getCartItems()
    if (respnose == 'noCartFound') {
      setCart([])
    } else {
      setCart(respnose?.data)
    }
  }

  async function updateCount(productId, count) {
    setUpdatingProductId(productId);
    let respnose = await updateProduct(productId, count)
    setCart(respnose.data)
    setUpdatingProductId(null);
  }

  async function removeItem(productId) {
    setDeletingProductId(productId);
    let respnose = await deleteProduct(productId)
    setCart(respnose.data)
    setDeletingProductId(null);
  }

  useEffect(() => {
    getCart()
  }, [])

  return <>

    {cart ? <div className="relative overflow-x-auto  sm:rounded-lg md:mx-20">
      <div className="flex justify-between p-5">
        <h2 className='text-xl font-bold' >total price: <span className='text-sky-500' >{cart?.totalCartPrice} EGP</span></h2>
        <Link to={'/checkout'} ><button type="button" class="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "> Checkout </button></Link>
      </div>
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
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.products?.length > 0 ? <>{cart?.products.map((product, index) =>
            <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
              <td className="p-4">
                <Link to={`/productdetails/${product.product.id}`}>
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                </Link>
              </td>
              <td className="px-6 py-4">
                <div className=' font-semibold text-gray-900 ' >{product.product.title}</div>
                <div className='text-gray-400 ' >{product.product.category.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {product.count == 1 ? <button className="cursor-not-allowed opacity-50 inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button> : <button onClick={() => { updateCount(product.product.id, product.count - 1) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>}
                  <div>
                    {updatingProductId === product.product.id ? <i className='fas fa-spinner fa-spin-pulse'></i> : <span>{product.count}</span>}
                  </div>
                  <button onClick={() => { updateCount(product.product.id, product.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 ">
                {product.price * product.count} EGP
              </td>
              <td className="px-6 py-4">
                <button onClick={() => removeItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">{deletingProductId === product.product.id ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Remove'}</button>
              </td>
            </tr>
          )}</> : <tr><td className='text-center py-5' colSpan={5} >Your Cart is empty</td></tr>}
        </tbody>
      </table>
    </div > : <Loading />}

  </>
}
