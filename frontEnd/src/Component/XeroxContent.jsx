import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ArrowRightSquare, Check, FileText, Minus, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React, { useState } from 'react'
import { RadioGroup } from '@radix-ui/react-radio-group'

const XeroxContent = ({count,setCount,XeroxColor,setXeroxColor,Side,setSide}) => {
    // const [count, setCount]=useState(1)
    // const[XeroxColor, setXeroxColor]=useState('black')
    // const[Side,setSide]=useState('')
  return (
    <div className=' p-3 w-full  border  rounded-md'>
       <div className='   w-full flex flex-row items-center justify-between '>
        <Label className='  text-sm font-bold capitalize '>number of copies</Label>
        <div  className=' p-3 w-20 h-8 text-white font-bold  flex flex-row items-center justify-between  bg-orange-400 rounded-md  text-xl'>
            <Minus size={20} className=' cursor-pointer' onClick={()=>{setCount(pre => pre>1 ? pre - 1:1); console.log(count)}}/>
            <Label className=' font-bold'>{count}</Label>
            <Plus size={20}  className='  cursor-pointer' onClick={()=>{setCount(pre => pre + 1); console.log(count)}}/>
        </div>
       </div>
       {/* color selection */}
       <Label className=' mt-2 capitalize font-bold sm:text-xl text-lg'>color mode </Label>
       <div className=' mt-3 flex flex-row gap-3 '>
        {/* B / W */}
        <div className='  h-28 w-28  border rounded-lg p-2  gap-2 bg-gray-50'>
        <div className=' flex flex-row w-full justify-between mt-3 items-center' >
          <Label className=' font-bold text-lg'>B/W</Label>  
          <div className={` h-6 w-6 border rounded-full flex items-center ${XeroxColor == 'black'? ' bg-green-800':'bg-none'}`} onClick={()=>{setXeroxColor('black')}}>
          { XeroxColor =='black'&&(
            <Check color='white'/>
          )

          }
         
          </div>
        </div>
        <Label className=' text-sm sm:text-base text-gray-400'>2/Page</Label>
        </div>
{/* 
        color */}
        <div className='  h-28 w-28  border rounded-lg p-2  gap-2 bg-gray-50'>
        <div className=' flex flex-row w-full justify-between mt-3 items-center' >
          <Label className=' font-bold  text-basesm:text-lg'>COLOR</Label>  
          <div className={` h-6 w-6 border rounded-full flex items-center ${XeroxColor == 'color'? ' bg-green-800':'bg-none'}`} onClick={()=>{setXeroxColor('color')}}>
          { XeroxColor =='color'&&(
            <Check color='white'/>
          )

          }
          </div>
          
        </div>
        <Label className=' text-sm sm:text-base text-gray-400'>10/Page</Label>
        </div>
       </div>

      {/* singles side double side  */}
       <div className=' mt-3 flex flex-col gap-3 '>
        <Label className=' font-bold  text-lg sm:text-xl'>Duplex</Label>
        {/* button */}
        <div className=' w-full flex flex-row gap-3 '>
          {/* single sided */}
        <div onClick={()=>(setSide('single-side'))} className={`  ring-green-600   ${Side == 'single-side' ? 'ring-1 bg-green-100 ':'bg-none ring-0'}  hover:cursor-pointer capitalize  w-full flex flex-row items-center justify-between p-3 h-16 border rounded-xl `}>
          
          <Label className='  text-base sm:text-lg font-semibold text-balance '>single-sided</Label>
          <FileText size={30}/>
         
         
        </div>

        {/* double sided */}
    <div className={` ring-green-600 hover:ring-1 ${Side == 'double-side' ? 'ring-1 bg-green-100 ':'bg-none ring-0'}   hover:cursor-pointer capitalize  w-full flex flex-row items-center justify-between p-3 h-16 border rounded-xl `}>
    <div onClick={()=>{setSide('double-side')}} className=' w-full flex flex-row items-center justify-between'>
         <Label className='  text-base sm:text-lg  font-semibold text-balance '> double-sided</Label>
          <FileText size={30} />
          </div>
        </div>

        </div>

       
        <div>

        </div>
       </div>
   
    </div>
  )
}

export default XeroxContent