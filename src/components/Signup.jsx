import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../features/authSlice'
import { Link } from 'react-router-dom'


function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("")
        console.log(data);
        try {
            const userData = await authService.createAccount({ ...data });

            if (userData) {

                const userData = await authService.getUser();
                if (userData) dispatch(login(userData))
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center w-full ">
  <div className={`w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[34%] max-w-3xl bg-white text-black rounded-2xl p-6 border border-gray-200 shadow-xl`}>
    <h2 className="mb-2 text-left text-2xl text-[#09090B] font-semibold leading-tight">Sign Up</h2>
    <p className="mb-5 text-left text-sm text-gray-700">Welcome to Jusblog! Sign up to get started
    </p>
    {error && <p className="mt-3 text-center text-red-500">{error}</p>}
    <form onSubmit={handleSubmit(signup)}>
      <div className='space-y-2'>
        <Input type="text" placeholder='Name' {...register("name", { required: "Full Name is required" })} />
        <Input type="email" placeholder='Email'{...register("email", {
          required: "Email is required", validate: {
            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Please enter a valid email address",
          }
        })} />
        <Input type="password" placeholder='Password' {...register("password", { required: "Password is required" })} />
      </div>
      <div className='flex flex-col sm:flex-row justify-between pt-4 w-full gap-2'>
        <Link to={'/'}>
          <Button className="w-full py-2 px-4 text-base font-semibold text-[#09090B] text-opacity-70 bg-white  border border-gray-300  rounded-lg shadow-md  transition-colors duration-300" type="submit">Back to Home</Button>
        </Link>
        <Button className="w-full py-2 px-4 text-base font-semibold  text-white bg-[#09090B] hover:bg-[#09090B] rounded-lg shadow-md transition-colors duration-300" type="submit">Sign Up</Button>
      </div>

    </form>
    <p className="mt-4 text-center text-sm text-gray-700">Have an account?
      <Link to={"/login"} className="font-medium text-[#09090B] hover:text-[#09090B] focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200">
        Log In
      </Link>
    </p>

  </div>
</div>
    )
}

export default Signup