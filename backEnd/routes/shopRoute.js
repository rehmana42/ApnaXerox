import express from "express";
import { allorders, CreateOrder, createPayment, downloadPdf, getShopBySearch, getShopDetails, Login, nearbyShop, Registor, setProfile, updateStatus, verifyPayment } from "../controller/AuthController.js";
import {upload, } from '../middleware/multer.js'
import { AuthUser } from "../middleware/Auth.js";
const shopRouter=express.Router()

// routes

shopRouter.post('/register',Registor)
shopRouter.post('/login',Login)
shopRouter.post('/update',AuthUser,upload.single('image'),setProfile)
shopRouter.get('/nearbyshop',nearbyShop)
shopRouter.get('/search', getShopBySearch)
shopRouter.get('/details/:id',getShopDetails)
shopRouter.post('/order',upload.array('files', 10),CreateOrder)
shopRouter.post('/create-order', createPayment)
shopRouter.post('/verify',verifyPayment)
shopRouter.get('/allorder',AuthUser,allorders)
shopRouter.get('/download',downloadPdf)
shopRouter.post('/updateStatus',AuthUser,updateStatus)

export default shopRouter
