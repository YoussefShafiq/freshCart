import React, { useContext, useEffect, useState } from 'react';
import style from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function ProductCard({ product }) {
  let { addToCart } = useContext(CartContext);

  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [wishedItems, setWishedItems] = useState([]);
  let headers = {
    token: localStorage.getItem('userToken')
  };

  async function addProductToCart(productId) {
    setAddingToCart(true);
    await addToCart(productId);
    setAddingToCart(false);
  }

  async function addToWishList(productId) {
    try {
      setAddingToWishlist(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId
      }, {
        headers
      });
      console.log(data);
      toast.success(data.message, {
        duration: 2000,
        icon: <i className="fa-solid fa-heart-circle-check text-xl text-red-600"></i>
      });
      refetchWishlistItems();
    } catch (error) {
      console.log(error);
    } finally {
      setAddingToWishlist(false);
    }
  }

  function getWishlistItems() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers
    });
  }

  let { data, refetch: refetchWishlistItems } = useQuery({
    queryKey: ['getWishlist'],
    queryFn: getWishlistItems,
    onSuccess: (data) => {
      getWishedItems(data);
    }
  });

  function getWishedItems(data) {
    let items = data?.data.data.map((item) => item.id);
    setWishedItems(items);
  }

  useEffect(() => {
    if (data) {
      getWishedItems(data);
    }
  }, [data]);

  function wished(productId) {
    return wishedItems?.includes(productId);
  }

  return (
    <>
      <div className="w-1/2 md:w-1/6 p-3 m-0 md:m-0">
        <div className='group bg-white hover:border-sky-500 hover:shadow-md hover:scale-105 duration-200 border border-transparent p-2 rounded-md relative'>
          <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-full rounded-t-md' alt="" />
          </Link>
          {addingToWishlist ? <button className='absolute z-20 right-0 m-2 text-xl'><i className='fas fa-spinner fa-spin-pulse'></i></button> : <button onClick={() => addToWishList(product.id)} className={`fa-heart absolute z-20 right-0 m-2 text-xl transition-all duration-1000 hover:duration-100 ${wished(product.id) ? 'fa-solid text-red-600' : 'fa-regular hover:text-red-500'}`}> </button>}
          <Link to={`/productdetails/${product.id}`}>
            <h3 className='text-sky-400'>{product.category.name}</h3>
            <h2> {product.title.split(' ').slice(0, 3).join(' ')} </h2>
            <div className="flex justify-between">
              <div>{product.price} EGP </div>
              <div> <i className='fa fa-star text-yellow-400'></i> {product.ratingsAverage} </div>
            </div>
          </Link>
          <button
            onClick={() => addProductToCart(product.id)}
            type='button'
            className='bg-sky-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-200 w-full p-2 mt-2 rounded text-sky-50 hover:bg-sky-400'
          >
            {addingToCart ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Add To Cart'}
          </button>
        </div>
      </div>
    </>
  );
}
