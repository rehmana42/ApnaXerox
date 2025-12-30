import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle ,  } from "@/components/ui/alert"
import React, { useContext, useEffect, useState } from 'react'
import { AlertTriangle, Mail } from 'lucide-react'
import { useLocation } from 'react-router'
import { XeroxContext } from '@/Context/XeroxContext'

const PaymentPage = () => {
const [order,setOrder]=useState()
const [email,setEmail]=useState('')
const {backendUrl}=useContext(XeroxContext)
  const {state}=useLocation()

 

  useEffect(()=>{
    console.log(state.amount)
    setOrder(state)
    console.log(order?.amount)
  },[order])

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };
  

  const handlePayment = async () => {
    await loadRazorpay();
  
    const orderRes = await fetch(`${backendUrl}/api/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: order.amount }), // rupees
    });
  
    const orders = await orderRes.json();
    // console.log("orders",orders)
    console.log("Backend order amount (paise):", orders.amount); // must be 500
  
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: "INR",
      name: "My MERN App",
      order_id: orders.id, // ✅ THIS IS ENOUGH
      handler: async function (response) {
        // console.log("Payment Response:", response);
  
        await fetch(`${backendUrl}/api/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: email,
            pdfNumber: order.pdfNumber,
          }),
        });
  
        alert("Payment Successful");
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  


  return (
    <div  className=' mt-10 flex  flex-col items-center justify-center gap-5'>
        
        <Input  value={email} onChange={(e)=>{setEmail(e.target.value)}} className=' w-full sm:w-[30vw] h-12  px-3 placeholder-opacity-100'  type='email' placeholder=" example@gmail.com"/>
        <Button className=' h-12 text-lg' onClick={()=>{handlePayment()}}>processd to pay</Button>
        
        <div className='  w-[90vw] sm:w-[40vw]'>
        <Alert className="border-yellow-400 bg-yellow-50/50">
      <AlertTitle className="flex items-center gap-2 text-yellow-700">
        <AlertTriangle className="h-5 w-5" />
        Important Instructions
      </AlertTitle>

      <AlertDescription className="mt-3 space-y-2 text-sm text-gray-700">
        <p className="flex items-start gap-2">
          <Mail className="h-4 w-4 mt-0.5 text-yellow-600 text-balance" />
          Please enter your <span className="font-semibold">correct email address</span>.
        </p>

        <p>📄 A <b>unique PDF code</b> will be sent to your email.</p>
        <p>📩 You can track the <b>PDF status</b> via email.</p>
        <p>🏪 Visit the Xerox shop, show your <b>PDF code</b>, and collect your print.</p>
      </AlertDescription>
    </Alert>
        </div>
    
    </div>
  )
}

export default PaymentPage