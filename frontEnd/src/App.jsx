import React, { useContext, useEffect } from 'react'
import { Button } from './components/ui/button'
import AllOrder from './Pages/AllOrder'
import Details from './Pages/Details'
import Footer from './Component/Footer'
import { Navigate, Route, Routes } from 'react-router'
import Navbar from './Component/Navbar'
import UploadPdf from './Pages/UploadPdf'
import DashBord from './Pages/DashBord'
import SetProfile from './Pages/SetProfile'
import Login from './Pages/Login'
import Registar from './Pages/Registar'
import { XeroxContext } from './Context/XeroxContext'
import PaymentPage from './Pages/PaymentPage'
import Home from './Pages/Home'


const App = () => {
  const{token, navigate}=useContext(XeroxContext)
  useEffect(()=>{
    console.log(token)
  },[token])
  return (
    <>
    {

 
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg-[9vw] overflow-x-hidden'>
      <Navbar/>
      <Routes>
        <Route path='/login'  element={ token ? <Navigate to={'/dashboard'}/> : <Login/>  }/>
        <Route path='/'   element={ token ? <Navigate to={'/dashboard'}/> : <Home/>} />
        <Route path='/dashboard' element={ token ? <DashBord/> : <Navigate to={'/'} />}/>
        <Route path='/uploadPdf' element={<UploadPdf/>}/>
       <Route path='/registar' element={<Registar/>}/>
       <Route path='/profile' element={<SetProfile/>}/>
       <Route path='/allshop' element={<AllOrder/>}/>
       <Route path='/detail/:id' element={<Details/>}/>
       <Route path='/pay' element={<PaymentPage/>}/>
      </Routes>
     {/* <AllOrder/> */}
     <Footer/>
    </div>

}

    </>
  )
}

export default App