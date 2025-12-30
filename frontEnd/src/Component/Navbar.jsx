import { Button } from '@/components/ui/button'
import { XeroxContext } from '@/Context/XeroxContext'
import { LogOutIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {token, setToken, navigate}=useContext(XeroxContext)
  return (
    <div className=" w-full bg-transparent border-b border-gray-200 z-50">
      
      {/* CENTERED CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={()=>{navigate('/')}} >
          Apna<span className="text-blue-600">Xerox</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <a onClick={()=>{navigate('/')}}  className="hover:text-blue-600 hover:cursor-pointer transition">Home</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#feature" className="hover:text-blue-600 transition">Feature</a>
          {/* <a href="#order" className="hover:text-blue-600 transition">Order</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a> */}
          {
            token &&
            <Button className='text-lg font-semibold'
            onClick={()=>{setToken(''); localStorage.setItem('token','')}}
            >
            <LogOutIcon/>
            Logout</Button>
          }
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
            <a  onClick={()=>{navigate('/')}} className="hover:text-blue-600">Home</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#feature" className="hover:text-blue-600">Feature</a>
            {/* <a href="#order" className="hover:text-blue-600">Order</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a> */}
            {
            token &&
            <Button className='text-lg font-semibold'
            onClick={()=>{setToken(''); localStorage.setItem('token','')}}
            >
            <LogOutIcon/>
            Logout</Button>
          }
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar
