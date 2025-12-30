import { Label } from '@radix-ui/react-label'
import { BadgeCheck, FileClock, Loader, PandaIcon } from 'lucide-react'
import React, { useEffect } from 'react'

const TopBar = ({order}) => {

  useEffect(()=>{
    console.log(order.filter(item => item.tracking==='printing').length)
 
  })
  return (
    <div className='   w-full  flex flex-col sm:flex-row justify-center items-center gap-6 px-2 py-4 '>
      {/* ------------------total Pending  ------------------*/}
      <div className="
  h-28  w-full sm:w-80
  flex items-center gap-4
  rounded-xl
  bg-white
  border border-slate-200
  shadow-sm hover:shadow-md
  transition
  p-4
">
  
  {/* Icon */}
  <div className="
    h-11 w-11
    rounded-lg

    flex items-center justify-center
   bg-red-200
  ">
    <FileClock size={22} />
  </div>

  {/* Text */}
  <div className="flex flex-col">
    <Label className="text-sm text-slate-500 capitalize">
      Total Pending
    </Label>
    <Label className="text-2xl font-semibold text-slate-900">
      {order.filter(item => item.tracking==='pending').length}
    </Label>
  </div>

</div>
 {/*----------------- total inprogress -----------------------*/}
<div className="
  h-28  w-full sm:w-80
  flex items-center gap-4
  rounded-xl
  bg-white
  border border-slate-200
  shadow-sm hover:shadow-md
  transition
  p-4
">
  
  {/* Icon */}
  <div className="
    h-11 w-11
    rounded-lg
    bg-lime-200
    flex items-center justify-center
    text-slate-700
  ">
    <Loader size={22} />
  </div>

  {/* Text */}
  <div className="flex flex-col">
    <Label className="text-sm text-slate-500 capitalize">
      Total  Inprogress
      </Label>
    <Label className="text-2xl font-semibold text-slate-900">
    {order.filter(item => item.tracking==='printing').length}
    </Label>
  </div>

</div>

{/* ------------------------total paid -------------*/}
<div className="
  h-28 
  flex items-center gap-4
  rounded-xl  w-full sm:w-80
  bg-white
  border border-slate-200
  shadow-sm hover:shadow-md
  transition
  p-4
">
  
  {/* Icon */}
  <div className="
    h-11 w-11
    rounded-lg
    bg-orange-300
    flex items-center justify-center
    text-slate-700
  ">
    <BadgeCheck size={22} />
  </div>

  {/* Text */}
  <div className="flex flex-col">
    <Label className="text-sm text-slate-500 capitalize">
      Total paid
    </Label>
    <Label className="text-2xl font-semibold text-slate-900">
      10
    </Label>
  </div>

</div>


    </div>
  )
}

export default TopBar