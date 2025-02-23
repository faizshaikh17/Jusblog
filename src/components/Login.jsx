import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from './index'
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin } from '../features/authSlice'
import { Link } from 'react-router-dom';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getUser()
        if (userData) dispatch(authLogin(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-[34%]  max-w-lg bg-white rounded-2xl p-7 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300`}> {/* Increased shadow and rounded corners */}
        {/* <div className="mb-5 flex justify-center"> Increased margin */}
        {/* <span className="inline-block w-full max-w-[100px]"> */}
        {/* <Logo className='' /> */}
        {/* </span> */}
        {/* </div> */}
        <h2 className="mb-2 text-left text-2xl text-[#09090B] font-semibold leading-tight">Sign In</h2> {/* Increased font size and darkened color */}

        <p className="mb-5 text-left text-sm text-gray-700">Welcome to Jusblog! Sign in to get started {/* Adjusted margin, font size, and color */}

        </p>



        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-6'>
          <div className='space-y-2'> {/* Increased space between input fields */}
            <Input placeholder="Email" type="email" {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email address",
              }
            })} />
            <Input placeholder="Password" type="password" {...register("password", {
              required: "Password is required"
            })} />
            <div className='flex pt-4 justify-between w-full'>
              <Link to={'/'}>
                <Button className="w-full py-2 px-4 text-base font-semibold text-[#09090B] text-opacity-70 bg-white rounded-lg shadow-md transition-colors duration-300" type="submit">Back to Home</Button>
                </Link>
              <Button className="w-full text-base font-semibold  text-white bg-[#09090B] hover:bg-[#09090B] rounded-lg shadow-md transition-colors duration-300" type="submit">Sign In</Button> {/* Significant button enhancement */}
            </div>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-gray-700"> {/* Adjusted margin and font size */}
          Don't have an account?
          <Link
            to="/signup"
            className="font-medium text-[#09090B] hover:text-[#09090B] focus:outline-none focus:ring-2 focus:ring-[#09090B] transition-colors duration-200" // Improved focus and hover
          > Sign Up
          </Link>
        </p>
      </div>
    </div >
  )
}