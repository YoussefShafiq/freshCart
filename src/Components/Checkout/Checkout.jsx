import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/CartContext'

export default function Checkout() {

  let { checkoutSession } = useContext(CartContext)

  const [APIerror, setAPIerror] = useState(null)
  const [submit, setSubmit] = useState(false)

  let navigate = useNavigate()

  let validationSchema = Yup.object().shape({
    details: Yup.string().min(3, 'min length is 3').max(20, 'max length is 20').required('address details is required'),
    phone: Yup.string().matches(/^(\+2|002)?01[0125][0-9]{8}$/, 'need eguptian phone number').required('phone is required'),
    country: Yup.string().min(3, 'min length is 3').max(20, 'max length is 20').required('country is required')
  })

  async function Checkout(values) {
    setSubmit(true)
    try {
      let response = await checkoutSession(values)
      console.log(response);
      if (response.status == 'success') {
        window.location.href = response.session.url
      }

    } catch (error) {
      console.log(error);

    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    }, validationSchema
    , onSubmit: Checkout
  })


  return <>


    <form onSubmit={formik.handleSubmit} className='p-4 md:w-1/2 m-auto py-10'>
      <h1 className='text-3xl py-4 font-semibold'>Shipping address</h1>

      <div className="relative  z-0 w-full mb-5 group">
        <input type="text" name="details" onBlur={formik.handleBlur} onChange={formik.handleChange} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your address details </label>
      </div>
      {formik.errors.details && formik.touched.details &&
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.details}
        </div>
      }

      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your phone </label>
      </div>
      {formik.errors.phone && formik.touched.phone &&
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.phone}
        </div>}

      <div className="relative  z-0 w-full mb-5 group">
        <input type="text" name="country" onBlur={formik.handleBlur} onChange={formik.handleChange} id="country" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " />
        <label htmlFor="country" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your country </label>
      </div>
      {formik.errors.country && formik.touched.country &&
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.country}
        </div>
      }

      {!submit ? <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Submit</button>
        : <button type="button" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>}

      {APIerror &&
        <div className="px-4 py-3 my-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {APIerror}
        </div>
      }
    </form>

  </>
}
