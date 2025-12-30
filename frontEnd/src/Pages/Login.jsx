import { XeroxContext } from "@/Context/XeroxContext"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { NavLink } from "react-router"
import { toast } from "sonner"

const Login = () => {
    const[shopName,setShopName]=useState('')
    const[email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const[password,setPassword]=useState('')
    const{navigate,token,setToken,backendUrl}=useContext(XeroxContext)

    useEffect(()=>{
      console.log(token)
    },[token])
    // handle function
    const handleSubmit=async()=>{
      try{
        setLoading(true)
        const response=await axios.post(`${backendUrl}/api/login`,{email,password})
        console.log(response.data)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success('logging successfully')
        }
        else{
          toast(response.data.error)
          setLoading(false)
        }
      }
      catch(e){
        toast.error(e.message)
      }
      finally{
        setLoading(false)
      }
    }
  return (
    <div className="bg-white md:min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-[950px] bg-white shadow-[0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden">
        <div className="flex items-center max-md:flex-col w-full gap-y-4">

          {/* Left Image Section */}
          <div className="md:max-w-[570px] w-full h-full">
            <div className="md:aspect-[7/10] bg-gray-50 relative before:absolute before:inset-0 before:bg-black/40 overflow-hidden w-full h-full">
              <img
                src="https://readymadeui.com/team-image.webp"
                className="w-full h-full object-cover"
                alt="login"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-full bg-gradient-to-t from-black/50 via-black/50 to-transparent absolute bottom-0 p-6 max-md:hidden">
                  <h1 className="text-white text-2xl font-semibold">
                    Welcome Back
                  </h1>
                  <p className="text-slate-300 text-[15px] font-medium mt-3 leading-relaxed">
                    Join our private network to discover job opportunities and
                    connect with professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="w-full h-full px-8 lg:px-20 py-8 max-md:-order-1">
            <form className="md:max-w-md w-full mx-auto">
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-slate-900">
                  Sign in
                </h3>
              </div>

              {/* Email */}
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a">
                      <path d="M0 512h512V0H0Z" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeWidth="40"
                      strokeMiterlimit="10"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    />
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                  </g>
                </svg>
              </div>

              {/* Password */}
              <div className="mt-8 relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}

                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104z" />
                </svg>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-sm text-slate-600"
                  >
                    Remember me
                  </label>
                </div>
              
              </div>

              {/* Submit */}
              <div className="mt-12">
                <button
                  onClick={()=>{handleSubmit()}}
                  type="button"
                  className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xl flex items-center justify-center"
                >
                  {loading? <RotatingLines
                  visible={true}
                  height="40"
                  width="40"
                  color="grey"
                  
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  className=' place-self-center'
                  
                  />: 'Sign In' }
                </button>
                <p className="text-slate-600 text-sm text-center mt-6">
                  Don&apos;t have an account?
                  <NavLink to={'/registar'} href="#" className="text-blue-600 ml-1 hover:underline">
                    Register here
                  </NavLink>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
