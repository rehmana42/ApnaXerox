
import express from  'express'
import {ConnectCloudinary} from './config/cloudinary.js'

import {config} from 'dotenv'
// import { setSocketInstance } from './config/socketServer.js'


import cors from 'cors'
import { ConnectDB } from './config/mongoDB.js'
import shopRouter from './routes/shopRoute.js'





const app=express()



config()
ConnectCloudinary()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// routes
app.use('/api',shopRouter)

ConnectDB()
// creating the connection 

console.log(process.env.MONGO_URL)
app.get('/',(req,res)=>{
    res.json('landing page is here ')
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})