import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Rating } from '@/components/ui/Rating'
import { XeroxContext } from '@/Context/XeroxContext'
import axios from 'axios'
import { CardSimIcon, Coffee, Shirt, Upload } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useParams } from 'react-router'

const Details = () => {

  const{id}=useParams()
  const[detail,setDetail]=useState([])
  const [location,setLocation]=useState([])
  const{backendUrl, navigate}=useContext(XeroxContext)
  const [loading,setLoading]=useState(false)
  
  useEffect(()=>{
  getDetails()

  },[])
  useEffect(()=>{

  },[detail])


  const getDetails=async()=>{
    try{
      setLoading(true)
      const response=await axios.get(`${backendUrl}/api/details/${id}`)
      console.log(response.data.details)
      setDetail(response.data.details)
      setLocation(response.data.location)
    }
    catch(e){
      console.log(e.message)
    }
    finally{
      setLoading(false)
    }
  }





  return (
    <div className='  mt-10 overflow-hidden'>
      { loading ?
      <div className="flex justify-center items-center h-[60vh]">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
        
    :<>
    <div className=' w-full flex flex-col sm:flex-row  justify-center gap-7  '>
    <div className="group h-[60vh] sm:h-[75vh] w-full sm:w-[35vw] overflow-hidden rounded-md transition-all duration-500 shadow-slate-300 hover:shadow-2xl">
  <img
    src={detail.shopImage}
    alt="shop photo"
    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
  />
</div>

        <div className='  flex flex-col gap-3 '>
          <Label className='  .inter font-bold text-xl ml-1'>{detail.shopName}</Label>
          <div className=' flex flex-row gap-2'>    <Rating  value={3.5} readOnly/><span>(122)</span></div>
      
          <div className=' flex flex-col gap-2 '>
            <Label className='   font-bold text-lg'>Price per page</Label>
            <div className=' flex flex-col ml-3'>
            <Label className=' text-sm font-bold'>B/W</Label>  <span className="font-semibold text-gray-400">₹{detail.blackAndWhite} / page</span>
           <Label className=' text-sm font-bold'>Color</Label> <span className="font-semibold text-gray-400">₹{detail.color}/ page</span>
            </div>
            <Label className=' text-lg font-semibold'>Address</Label>
            <Label  className=' text-xs font-medium text-gray-500 text-pretty    truncate   whitespace-nowrap w-80'>{location}</Label>
            <div className=' flex flex-col '>
              <Label className='   capitalize font-bold text-base'>monday-saturday</Label>
              <Label className='text-sm text-gray-400'> 9.00 am- 8.00 am</Label>
            </div>
            <div className='  flex flex-col gap-3'>
              <Label className='  uppercase font-bold text-base text-green-500 '>{detail.shopStatus}</Label>
              
            </div>
           
          </div>
        </div>


    </div>
    <div className=' w-full  flex justify-center items-center'>
    <Button  className=' w-[50vw] mt-5  capitalize  text-xl font-bold' onClick={()=>{
      navigate("/uploadPdf",{state:{detail}})
    }}>
      <Upload className=' h-10 w-10' />
      Upload pdf</Button>
    </div>
    </>
}
    </div>
  )
}

export default Details