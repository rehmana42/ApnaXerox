import React from 'react'

const Footer = () => {
  return (
<div className=" bg-transparent text-black mt-20">
  <div className=" w-full mx-auto px-6 py-10">

    {/* Top Row */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
      
      {/* Company Name */}
      
      <h1 className="text-2xl font-bold text-gray-900">
          Apna<span className="text-blue-600">Xerox</span>
        
      </h1>

      {/* Social Links */}
      <div className="flex gap-5">
        <a
          href="#"
          className="hover:text-pink-500 transition"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5z"/>
            <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/>
            <circle cx="17.5" cy="6.5" r="1"/>
          </svg>
        </a>

        <a href="#" className="hover:text-blue-500 transition">
          Facebook
        </a>
        <a href="#" className="hover:text-sky-400 transition">
          Twitter
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          LinkedIn
        </a>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 my-6"></div>

    {/* Bottom Text */}
    <p className="text-center text-sm text-gray-600">
      © {new Date().getFullYear()} YourCompany. All rights reserved.
    </p>

  </div>
</div>

  )
}

export default Footer