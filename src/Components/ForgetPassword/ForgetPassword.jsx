import React, { useContext, useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'

export default function ForgetPassword() {



  const [APIerror, setAPIerror] = useState(null)
  const [submit, setSubmit] = useState(false)
  let { userData, setUserData } = useContext(UserContext)

  let navigate = useNavigate()

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('invalid mail').required('email is required'),
  })

  async function resetPassword(values) {
    setSubmit(true)
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      setSubmit(false)
      navigate('/verifyresetcode')


    } catch (error) {
      setSubmit(false)
      setAPIerror(error.response.data.message);
    }

  }

  let formik = useFormik({
    initialValues: {
      email: ''
    }, validationSchema  //the validation schema have the same name of the formik so we can don't write it here
    , onSubmit: resetPassword
  })

  return <>




    <form onSubmit={formik.handleSubmit} className='md:w-1/2 m-auto py-[20vh]'>
      <h1 className='text-3xl py-4 font-semibold'>Forgot Password</h1>
      {/* email */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your Email </label>
      </div>
      {formik.errors.email && formik.touched.email &&
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.email}
        </div>
      }


      <div className="flex justify-between">

        {!submit ? <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Verify with email</button>
          : <button type="button" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>}

      </div>

      {APIerror &&
        <div className="px-4 py-3 my-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {APIerror}
        </div>
      }
    </form>


  </>
}
