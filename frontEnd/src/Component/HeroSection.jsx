import { assets } from '@/assets/assets'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Navigate } from 'react-router'
import { XeroxContext } from '@/Context/XeroxContext'

const HeroSection = () => {
  const{navigate}=useContext(XeroxContext)
  return (
    <section id='home' className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Smart & Fast <span className="text-green-500">Xerox</span> Services
            </h1>

            <p className="text-gray-600 text-base md:text-lg max-w-xl">
              Upload your PDFs, select nearby Xerox shops, and get high-quality
              prints without waiting in queues.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="px-6 py-6 rounded-xl text-base bg-green-500 hover:bg-green-600" onClick={()=>{navigate('/allshop')}}>
                Print Now
              </Button>

              <Button
                variant="outline"
                className="px-6 py-6 rounded-xl text-base border-gray-300"
                onClick={()=>{navigate('/login')}}
              >
                Register Shop
              </Button>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="flex justify-center md:justify-end">
            <video
              src={assets.heroSection2} // video file
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-md md:max-w-lg rounded-2xl shadow-lg object-cover pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
