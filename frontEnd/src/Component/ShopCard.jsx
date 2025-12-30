import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useContext } from "react"

import { XeroxContext } from "@/Context/XeroxContext"

const ShopCard = ({ shopName ,price,image ,shopId}) => {
  const {navigate}=useContext(XeroxContext)
  return (
    <Card
      className="
      .inter
        w-full max-w-[260px] sm:max-w-[260px]
        overflow-hidden rounded-2xl
        shadow-sm hover:shadow-lg
        transition duration-300
        bg-white
      "
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 w-full">
        <img
          src={image}
          alt="Shop"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className=" p-3 pt-4 ">
        <Label className="text-base sm:text-lg font-semibold text-slate-700 ">
          {shopName}
        </Label>

        {/* <p className="text-xs sm:text-sm text-muted-foreground">
         · Color & B/W
        </p> */}

        <p className=" text-base font-bold text-primary">
        ₹{price} / page 
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className=" p-3 pb-4 pt-1">
        <Button onClick={()=>{ navigate(`/detail/${shopId}`)}} className="w-full rounded-xl text-sm   hover:shadow-2xl shadow-zinc-400">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ShopCard
