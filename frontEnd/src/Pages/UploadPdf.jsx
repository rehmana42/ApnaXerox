import PdfPreview from '@/Component/PdfPreview'
import XeroxContent from '@/Component/XeroxContent'
import { Button } from '@/components/ui/button'
import { XeroxContext } from '@/Context/XeroxContext'
import { Label } from '@radix-ui/react-label'
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'
import { IndianRupee , WalletCards} from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation } from 'react-router'

const UploadPdf = () => {
  const [pdfs, setPdf] = useState([])
  const location=useLocation()
   const [count, setCount]=useState(1)
   const[XeroxColor, setXeroxColor]=useState('black')
     const[Side,setSide]=useState('single-side')
    const [page,setPage]=useState(0)
    const [amount,setAmount]=useState(0)
    const  [shop,setShop]=useState([])
    const[loading, setLoading]=useState(false)
 

    // context variable
    const {backendUrl, navigate}=useContext(XeroxContext)
    let total=0
    let calculatedAmount =0
    useEffect(()=>{
      // console.log(pdfs.map(i=>(i.file)))
  
     pdfs.forEach((e)=>{
      // console.log(e.file)
     console.log(`actual number of pages ${e.pages}`)
    
       total+=e.pages
       setPage(total)
       console.log(total)
     })
    },[pdfs])
    
    useEffect(()=>{
      console.log(XeroxColor)
    },[XeroxColor])

    useEffect(()=>{
       setShop(location.state.detail)
      // console.log(shop)
    },[shop])

    //setting the amount 
    useEffect(()=>{
       calculatedAmount =
  XeroxColor === "black"
    ? page >= 30
      ? 2 * page * count
      : (shop?.blackAndWhite || 0) * page * count
    : (shop?.color || 0) * page * count;

setAmount(calculatedAmount);
console.log(calculatedAmount)
    }, [XeroxColor, page, count, shop])


// ------------ create form  ----------
const formData=new FormData()


pdfs.forEach((pdf) => {
  console.log(pdf.file)
  formData.append("files", pdf.file) // 👈 SAME KEY, multiple times
})

formData.append('count',count)
formData.append('color',XeroxColor)
formData.append('side',Side)
formData.append('page',page)
formData.append('amount',amount)
formData.append('shopId',shop._id)



const submitHandler=async()=>{
  try{
    setLoading(true)
    const response=await axios.post(`${backendUrl}/api/order`,formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )
    // console.log(response.data.order)
  
   
 
    navigate('/pay',{state:response.data.order})
  }
  catch(e){
    console.log(e.message)
  }
  finally{
    setLoading(false)
  }
}

  return (
    <div className=' flex flex-col  gap-3  overflow-x-hidden overflow-y-hidden '>
        <PdfPreview  pdfs={pdfs} setPdf={setPdf}/>
        <XeroxContent count={count} setCount={setCount} XeroxColor={XeroxColor} setXeroxColor={setXeroxColor} Side={Side} setSide={setSide} />
        <div className=' w-full   h-16 border rounded-md flex flex-row   items-center justify-between px-3 '>
             {/* leftside */}
          <div className=' flex flex-col p-2'>
          <Label className=' text-lg text-gray-400 capitalize'> total { page} pages </Label>
          <Label className=' text-xl font-bold flex items-center flex-row'>
          <IndianRupee size={20}/>
          <span>
          {
            amount
  }
             </span>
          </Label>
          </div>
          {/* { page>=30 ? 2*page: 5*page} */}
             {/* right side */}
             <Button onClick={()=>{submitHandler()}} className=' bg-orange-600  hover:bg-orange-600  text-white rounded-lg font-bold text-xl'>
              
             {loading? <RotatingLines
                  visible={true}
                  height="70"
                  width="70"
                  color="grey"
                  
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  className=' place-self-center'
                  
                  />:  <>
              <WalletCards /> 
             process  
             </> 
               }
             
             </Button>
        </div>

    </div>
  )
}

export default UploadPdf