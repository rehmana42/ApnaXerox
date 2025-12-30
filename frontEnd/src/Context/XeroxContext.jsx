
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

export const XeroxContext = createContext()
const XeroxContextProvider=(props)=>{
    const navigate=useNavigate() 
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [token,setToken]=useState(localStorage.getItem('token')? localStorage.getItem('token'):'')


    const value={navigate,backendUrl, token, setToken}
    return(
        <XeroxContext.Provider value={value}>
                {props.children}
        </XeroxContext.Provider>
    )

}

export default XeroxContextProvider