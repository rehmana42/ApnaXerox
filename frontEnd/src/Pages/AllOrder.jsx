import { assets } from "@/assets/assets"
import SearchBar from "@/Component/SearchBar"
import ShopCard from "@/Component/ShopCard"
import { useEffect, useEffectEvent, useState } from "react"
import { Bars } from "react-loader-spinner"

const AllOrder = () => {
  const[shop,setShop]=useState([])
  const[loading, setLoading]=useState(false)
  useEffect(()=>{
    console.log(shop)
  },[shop])
  return (
    <div className="w-full flex flex-col items-center   min-h-screen">
      <SearchBar shop={shop} setShop={setShop} setLoading={setLoading} />
      { loading?
      <div className="flex justify-center items-center h-[60vh]">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
        
      
     : shop.length<=0 ?
      <div className="  mt-10 flex flex-col items-center justify-center gap-6 px-4 py-10 text-center">

{/* Video */}
<video
  src={assets.Printer}
  autoPlay
  muted
  loop
  playsInline
  className="
    w-full 
    max-w-[260px] 
    sm:max-w-[290px] sm:h-64
    md:max-w-[380px]
    rounded-2xl 
    object-cover 
    shadow-lg 
    pointer-events-none
  "
/>

{/* Text */}
<div className="max-w-xl space-y-2">
  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
    Search shops by typing the name
  </p>
  <p className="text-sm sm:text-base text-gray-500">
    Or find nearby shops instantly by clicking the location icon
  </p>
</div>

</div>
:<div
  className="
    mt-10 grid
    grid-cols-2
    sm:grid-cols-3 md:grid-cols-4
    place-items-center
    place-self-center
    gap-x-5 gap-y-8
    sm:gap-6
    px-3 sm:px-5 py-6
  "
>
{ shop?.map((i,id)=>(
  <ShopCard key={id}  shopName={i.shopName} price={i.blackAndWhite} image={i.shopImage} shopId={i._id}/>
))
    
}
</div> 
}


      
    </div>
  )
}

export default AllOrder
