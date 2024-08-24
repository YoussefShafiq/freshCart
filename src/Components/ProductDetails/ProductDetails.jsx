import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Products from '../Products/Products';
import ProductCard from '../ProductCard/ProductCard';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function ProductDetails() {


  let { id } = useParams()
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishedItems, setWishedItems] = useState([]);
  const [wishedState, setWishedState] = useState(false);
  const [loading, setLoading] = useState(false);

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
      toast.success(data.message, {
        duration: 2000,
        icon: <i className="fa-solid fa-heart-circle-check text-xl text-red-600"></i>
      });
      setWishedState(true)
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

  let { data: wishlistData, refetch: refetchWishlistItems } = useQuery({
    queryKey: ['getWishlist'],
    queryFn: getWishlistItems,
    onSuccess: (wishlistData) => {
      getWishedItems(wishlistData);
    }
  });

  function getWishedItems(data) {
    let items = data?.data.data.map((item) => item.id);
    setWishedItems(items);
    if (wished(product.id)) {
      setWishedState(true)
    }
  }

  useEffect(() => {
    if (wishlistData) {
      getWishedItems(wishlistData);
    }
  }, [wishlistData]);

  useEffect(() => {
    getWishedItems(wishlistData);
  }, [product])

  function wished(productId) {
    return wishedItems?.includes(productId);
  }

  var settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product.images[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getProductDetails() {
    try {
      setLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${product.category?._id}`)
      setProducts(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRelatedProducts();
  }, [product]);



  useEffect(() => {
    getProductDetails()
    window.scrollTo(0, 0);
  }, [id])


  let { addToCart } = useContext(CartContext)


  return <>
    {loading ? <Loading /> : <>{
      product.title ? <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 py-10">
        <div className="w-3/4 mb-7 md:w-1/4 md:mb-0">
          {product.images.length > 1 ? <Slider {...settings}>
            {product.images?.map((image, index) => <img key={index} src={image} className='w-full' />)}
          </Slider> : <img src={product.imageCover} className='w-full' />}
        </div>
        <div className="w-full p-4 md:w-3/4">
          <h1 className='text-2xl mb-2 font-semibold' >{product.title} </h1>
          <p className='text-gray-400' >{product.description} </p>
          <h3 className='my-1 text-sky-500' >{product.category?.name} </h3>
          <div className="flex justify-between">
            <div>{product.price} EGP </div>
            <div> <i className='fa fa-star text-yellow-400'></i> {product.ratingsAverage} </div>
          </div>
          <div className="flex">
            <button onClick={() => addProductToCart(product.id)} type='button' className='bg-sky-500 duration-200 w-full p-2 mt-2 rounded text-sky-50 hover:bg-sky-400'>{addingToCart ? <i className='fas fa-spinner fa-spin-pulse'></i> : 'Add To Cart'}</button>
            {addingToWishlist ? <button className='z-20 right-0 m-2 text-xl'><i className='fas fa-spinner fa-spin-pulse'></i></button> : <button onClick={() => addToWishList(product.id)} className={`fa-heart z-20 right-0 m-2 text-xl transition-all duration-1000 hover:duration-100 ${wished(product.id) & wishedState ? 'fa-solid text-red-600' : 'fa-regular hover:text-red-500'} `}> </button>}

          </div>
        </div>
      </div> : <div className="flex justify-center py-14"> <Loading /> </div>
    }</>}

    <h2 className='m-2 text-xl text-sky-500' >You may also like these products</h2>
    <div className="flex flex-wrap">
      {products.map((productc, index) => <ProductCard key={index} product={productc} />)}
    </div>

  </>
}
