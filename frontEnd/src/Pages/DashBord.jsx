
import PrintTable from '@/Component/PrintTable'
import TopBar from '@/Component/TopBar'
import { XeroxContext } from '@/Context/XeroxContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'

const DashBord = () => {
  const {token,backendUrl}=useContext(XeroxContext)
  const [order,setOrder]=useState([])
  const [loading, setLoading]=useState(false)


useEffect(()=>{
  getOrders()
},[])

  //get orders
  const getOrders=async()=>{
    try{
      setLoading(true)
      const response=await axios.get(`${backendUrl}/api/allorder`,{headers:{token}})
      // console.log(response.data.order)
      setOrder(response.data.order)
      setLoading(false)
    }
    catch(e){
      console.log(e.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className=' w-full flex flex-col  gap-11 overflow-x-hidden'>
     {loading ? (
  <div className="flex justify-center items-center h-[60vh]">
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      visible={true}
    />
  </div>
) : (
  <>
    <TopBar order={order} />
    <PrintTable order={order} loading={loading} setLoading={setLoading} />
  </>
)}

    </div>
  )
}

export default DashBord