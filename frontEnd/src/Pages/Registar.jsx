import { XeroxContext } from '@/Context/XeroxContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { NavLink } from 'react-router'
import { toast } from 'sonner'

const Registar = () => {
  const[shopName,setShopName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const{navigate,token,setToken,backendUrl}=useContext(XeroxContext)
  const [loading,setLoading]=useState(false)

 const  handleSubmit =async()=>{
    try{
      setLoading(true)
      const response=await axios.post(`${backendUrl}/api/register`,{shopName,email,password})
      console.log(response.data)
      if(response.data.success){
        console.log(response.data.token)
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)

        navigate('/profile')
      }
      else(
        toast.error(response.data.error)
      )
      
    }
    catch(e){
      toast.error(e.message)

    }
    finally{
    setLoading(false)  
    }
  }

  return (
    <div className="bg-white md:min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[950px] bg-white shadow-[0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden">
        <div className="flex items-center max-md:flex-col w-full">

          {/* Left Image Section */}
          <div className="md:max-w-[570px] w-full">
            <div className="md:aspect-[7/10] bg-gray-50 relative before:absolute before:inset-0 before:bg-black/40 overflow-hidden">
              <img
                src="https://readymadeui.com/team-image.webp"
                className="w-full h-full object-cover"
                alt="register"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6 max-md:hidden">
                  <h1 className="text-white text-2xl font-semibold">
                    Welcome Back
                  </h1>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    Join our private network to discover job opportunities and
                    connect with professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="w-full px-8 lg:px-20 py-10 max-md:-order-1">
            <form className="md:max-w-md w-full mx-auto">

              <div className="mb-10">
                <h3 className="text-4xl font-bold text-slate-900">
                  Sign up
                </h3>
              </div>

              {/* Shop Name */}
              <div className="relative flex items-center mb-6">
                <input
                  name="shopName"
                  type="text"
                  value={shopName}
                  onChange={(e)=>{setShopName(e.target.value)}}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-9 px-2 py-3 outline-none"
                  placeholder="Enter shop name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] absolute right-2"
                >
                  <path d="M3 9l1-5h16l1 5v2H3V9zm0 4h18v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7z" />
                </svg>
              </div>

              {/* Email */}
              <div className="relative flex items-center mb-6">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-9 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] absolute right-2"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>

              {/* Password */}
              <div className="relative flex items-center mb-8">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-9 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                >
                  <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                </svg>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mb-10">
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

              {/* Submit */}
              <button
                type="button"
                onClick={()=>{handleSubmit()}}
                className=" flex  items-center justify-center w-full py-2.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-lg transition"
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
                  
                  />: 'Sign up' }
              </button>

              <p className="text-slate-600 text-sm text-center mt-6">
                Already have an account?
                <NavLink
                  to="/login"
                  className="text-blue-600 ml-1 hover:underline capitalize"
                >
                  login here
                </NavLink>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Registar
