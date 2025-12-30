
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from './components/ui/sonner'
import XeroxContextProvider from './Context/XeroxContext'
import { BrowserRouter } from 'react-router'


createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <XeroxContextProvider>
     <App />
     <Toaster/>
     </XeroxContextProvider>
 
     </BrowserRouter>
  
)
