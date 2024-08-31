import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function AllOrders() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [orderDetails, setOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, []);

  function getOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`)
  }

  let { data, isLoading } = useQuery({
    queryKey: 'userOrders',
    queryFn: getOrders
  })

  console.log(data?.data[0].createdAt);

  function selectOrder(id) {
    setSelectedOrder(id)
    setOrderDetails(true)
  }



  return (
    <>
      <h1 className="text-3xl mb-3 text-center">AllOrders</h1>

      {isLoading ? <Loading /> : <>
        {data?.data.map((order) => <>
          <div className="w-screen md:w-1/3 inline-block p-4 md:p-2">
            <div className='bg-gray-100 w-full  rounded-xl'>
              <div className={`flex justify-between p-3 rounded-xl ${!order.isDelivered ? 'bg-sky-100' : 'bg-green-100'} `}>
                <div>
                  ID: <span>{order.id}</span>
                </div>
                <div>{order.createdAt.slice(0, 10)}</div>
              </div>
              <div className='p-3 '>
                <div className='font-bold'>Order Price: <span className='font-semibold' >{order.totalOrderPrice}</span></div>
                <div className='font-bold' >Payment method: <span className='font-semibold' >{order.paymentMethodType}</span> {order.isPaid ? <span className='p-1 text-white bg-blue-500 text-xs uppercase rounded' >paid</span> : <span className='p-1 text-white bg-red-500 text-xs uppercase rounded' >not paid</span>} {order.isDelivered ? <span className='p-1 text-white bg-blue-500 text-xs uppercase rounded' >Delivered</span> : <span className='p-1 text-white bg-red-500 text-xs uppercase rounded' >not Delivered</span>}</div>
                <button onClick={() => selectOrder(order.id)} className='w-full mt-5 bg-white p-2 rounded-md hover:bg-blue-600 transition-all hover:text-sky-50 focus:bg-blue-500 focus:text-sky-50' >order details</button>
              </div>
            </div>
          </div>
        </>)}
      </>}



      {orderDetails && <div onClick={() => setOrderDetails(false)} className={` font- w-screen h-screen fixed inset-0 backdrop-blur-sm overscroll-none transition-all `}>
        <div onClick={(e) => e.stopPropagation()} className='w-[90vw] md:w-1/3 shadow-xl h-[70vh] overflow-y-auto bg-gray-50 rounded-xl top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 overscroll-none p-4'>
          <h2 className='font-bold font text-blue-600 text-xl my-4'>order items:</h2>
          {data.data.map((order) => <>
            {order.id == selectedOrder ? <>
              {order.cartItems.map((item) => <>
                <div className="flex flex-col">
                  <div>
                    <div className='flex justify-between'>
                      <p>{item.product.title.split(' ').slice(0, 3).join(' ')}</p>
                      <p>{item.price} EGP</p>
                    </div>
                    <hr className='m-2' />
                  </div>
                </div>
              </>)}
              <div className='flex justify-between font-extrabold'>
                <p>Total price:</p>
                <p>{order.totalOrderPrice} EGP</p>
              </div>
            </> : ''}
          </>)}
        </div>
      </div>}
    </>
  );
}