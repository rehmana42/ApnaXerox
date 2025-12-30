import React, { useContext, useState } from "react"
import { MapPin, Upload, Store, IndianRupee } from "lucide-react"
import { XeroxContext } from "@/Context/XeroxContext"
import { RotatingLines } from "react-loader-spinner"
import axios from "axios"
import { toast } from "sonner"

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm
      focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
    />
  </div>
)

const SetProfile = () => {
  const [location, setLocation] = useState({ lat: "", lon: "" })
  const [image, setImage] = useState(null)
  const[blackAndWhite,setBlackAndWhite]=useState('')
  const[color,setColor]=useState('')
  const[spiral,setSpiral]=useState('')
  const[bankName,setBankName]=useState('')
  const[accountNumber,setAccountNumber]=useState('')
  const[ifscCode,setIfscCode]=useState('')

  const[loading, setLoading]=useState(false)
  // context 

  const{token,setToken,navigate, backendUrl}=useContext(XeroxContext)
  const formData= new FormData()
  formData.append("lat",location.lat)
  formData.append("lon",location.lon)
  formData.append("image",image)
  formData.append("blackAndWhite",blackAndWhite)
  formData.append("color",color)
  formData.append("spiral",spiral)
  formData.append("bankName",bankName)
  formData.append("accountNumber",accountNumber)
  formData.append("ifscCode",ifscCode)
  const handleSUbmit=async()=>{
    try{
      console.log(location)
      console.log('dady')
      console.log(token)
      setLoading(true)
      const response= await axios.post(`${backendUrl}/api/update`, formData, { headers:{token} })
      console.log(response.data)
      console.log(response.data.success)
      if(response.data.success == true){
        console.log('hii')
        navigate('/dashboard')
      }
      else{
        
        // console.log(response.data.error)
        // toast.error(response.data.error)
      }
 
    }
    catch(e){
      console.log(e.message)
    }
    finally{
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude.toFixed(6),
          lon: pos.coords.longitude.toFixed(6),
        }),
      () => alert("Location permission denied")
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Store /> Shop Profile
      </h1>

      <div className="space-y-8">

        {/* PHOTO */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-medium mb-4">Shop Photo</h2>

          <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl border border-dashed border-gray-300 
flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100
hover:border-primary transition group cursor-pointer shadow-sm">

  {image ? (
    <img
      src={URL.createObjectURL(image)}
      alt="Shop"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  ) : (
    <div className="flex flex-col items-center gap-2 text-gray-400">
      <Upload size={36} />
      <p className="text-sm">Upload shop photo</p>
    </div>
  )}

</div>


            <label className="cursor-pointer text-sm bg-black text-white px-4 py-2 rounded-xl">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
        </section>

        {/* CHARGES */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-medium mb-4 flex items-center gap-2">
            <IndianRupee size={18} /> Printing Charges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="B/W per page (₹)" placeholder="2" value={blackAndWhite} onChange={(e)=>{setBlackAndWhite(e.target.value)}} />
            <Input label="Color per page (₹)" placeholder="10" value={color} onChange={(e)=>{setColor(e.target.value)}} />
            <Input label="Spiral binding (₹)" placeholder="40" value={spiral} onChange={(e)=>{setSpiral(e.target.value)}} />
          </div>
        </section>

      {/*  Account details */}

      <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-medium mb-4 flex items-center gap-2">
            <IndianRupee size={18} /> Account Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Bank Name"  value={bankName} onChange={(e)=>{setBankName(e.target.value)}} />
            <Input label="Account Number" value={accountNumber} onChange={(e)=>{setAccountNumber(e.target.value)}}  />
            <Input label="IFSC code"  value={ifscCode} onChange={(e)=>{setIfscCode(e.target.value)}} />
          </div>
        </section>


        {/* LOCATION */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-medium mb-4 flex items-center gap-2">
            <MapPin size={18} /> Exact Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Input label="Latitude" value={location.lat} readOnly />
            <Input label="Longitude" value={location.lon} readOnly />

            <button
              onClick={getCurrentLocation}
              className="h-[42px] rounded-xl bg-black text-white
              flex items-center justify-center gap-2 hover:opacity-90"
            >
              <MapPin size={16} /> Use Current
            </button>
          </div>
        </section>

        {/* SAVE */}
        <div className="flex justify-end">
          <button  onClick={()=>{handleSUbmit()}} className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700">
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
                  
                  />: '  Save Profile' }
          
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetProfile
