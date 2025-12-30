import React, { useContext, useEffect, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal, Search, LocateFixed, Axis3D } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import XeroxContent from "./XeroxContent"
import { XeroxContext } from "@/Context/XeroxContext"

const SearchBar = ({shop, setShop, setLoading}) => {
  const [location, setLocation] = useState({ lat: "", lon: "" })
  const [searchQuery,setSearchQuery] = useState('')

  // context
  const{backendUrl}=useContext(XeroxContext)

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }
  
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude.toFixed(6),
            lon: pos.coords.longitude.toFixed(6),
          };
          setLocation(coords); // UI ke liye
          resolve(coords);     // logic ke liye
        },
        () => reject("Location permission denied")
      );
    });
  };
  
  useEffect(()=>{
     getCurrentLocation()
  },[])

  useEffect(()=>{
    if (!searchQuery.trim()) {
      setShop([]);
      return;
    }

    
    const delay = setTimeout(getShopSearch, 400); // debounce
    return () => clearTimeout(delay);
  },[searchQuery])

  

  const getShop=async()=>{
    try{
      
setLoading(true)
      const {lat,lon}=await getCurrentLocation()
      setLoading(true)
      if(!location.lat,!location.lon){
       return toast.error(' your location is show please try to search by typing name ')
      }
      const response=await axios.get(`${backendUrl}/api/nearbyshop?lat=${lat}&lon=${lon}`,)
      if(response.data.success){
        console.log(response.data)
        setShop(response.data.shop)
        setLoading(false)
      }
      else{
        toast.error(response.data.error)
      }
      
    }
    catch(e){
      toast.error(e.message)
    }
    finally{
      setLoading(false)
    }
  }

  const getShopSearch=async()=>{
    try{
      setLoading(true)
      const response=await axios.get(`${backendUrl}/api/search?searchQuery=${searchQuery}`)
      // console.log(response.data)

      if(response.data.success){
          setShop(response.data.shops)
          setLoading(false)
      }
    }
    catch(e){
      toast.error(e.message)

    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-2 flex gap-3 items-center sm:justify-center relative top-10">

      {/* Search */}
      <InputGroup className="sm:w-[50vw] h-12 bg-slate-200" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value);}}>
        <InputGroupInput placeholder="Search..."   />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {/* Filter Icon */}
      <div
        onClick={() => getShop()}
        className="h-12 w-12 rounded-md bg-slate-200 flex items-center justify-center cursor-pointer"
      >
        <LocateFixed color="#5A9CB5" />
      </div>

      
    </div>
  )
}

export default SearchBar
