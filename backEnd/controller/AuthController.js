
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import shopModel from '../models/shopModel.js'
import orderModel from '../models/orderModel.js'
import {v2 as cloudinary} from 'cloudinary'
import axios from 'axios'
import crypto from 'crypto'

import {config} from 'dotenv'
import Razorpay from 'razorpay'
import { trans } from '../config/mailConfig.js'

config()

//---------------- razorpay configuration ----------------
// console.log(process.env.RAZORPAY_KEY_ID,)
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



//token function 
const createToken=(id,role)=>{
    return jwt.sign({id},process.env.JWT_SECRATE)
}
//Registor 
export const Registor=async(req,res)=>{
try{
 const {shopName,email,password}=req.body
 const user= await shopModel.findOne({email})
 if(user)return res.json({success:false, error:"user already exist"})
  const salt=await bcrypt.genSalt(10)
  const hash=await bcrypt.hash(password,salt)
  const Newuser= await  shopModel.create({
    shopName,
    email,
    password:hash
  })
  
console.log(Newuser)
const token =createToken(Newuser._id)
console.log(token)
return res.json({success:true, token})


}
catch(e){
    res.json({success:false,error:e.message})
    console.log(e.message)
}
}

//Login

export const Login=async(req,res)=>{
    try{
       const {email,password}=req.body
       console.log(password)
        const user=await shopModel.findOne({email})
        if(!user)return res.json({success:false,error:'user not found'})

        else{
            const isMatch=await bcrypt.compare(password,user.password)
            if(isMatch){
                const token=createToken(user._id)
                console.log(token)
               return res.json({success:true,token})
            }
            else{
                res.json({success:false,error:'wrong password'})
            }
        }

        

    }
    catch(e){
        return res.json({success:true, error:e.message})
    }
} 
// -------------------------------------------shop profile setting logic ----------------
export const setProfile=async(req,res)=>{
    try{
        // console.log(" my  name is abdul")
        console.log( req.userId)
        const {blackAndWhite,color,spiral,bankName,accountNumber,ifscCode, lat,lon}=req.body
       
        console.log(blackAndWhite)
        const image=req.file.path
        console.log(image)
        let imageUrl=(await (cloudinary.uploader.upload(image))).secure_url
        console.log(imageUrl)
        
        const shop =await shopModel.findByIdAndUpdate(
            req.userId.id,
            {
              shopImage: imageUrl,
              blackAndWhite,
              color,
              spiralBinding: spiral,
              location:{
                coordinates:[lat,lon]
              },
              
              bankName,
              accountNumber,
              ifscCode
            },
            { new: true }
          )

        console.log(shop)
        res.json({success:true,msg:shop})
    }
    catch(e){
        return res.json({success:false, error:e.message})
    }
}
// ----------------------------- get nearby shops  -----------------------
 export const nearbyShop=async(req,res)=>{

    try{
        const {lat,lon}=req.query
        console.log(lat)
        console.log(lon)
        // await shopModel.collection.createIndex(
        //     { ocation: "2dsphere" },
        //     { type: "2dsphere" }
        //   )
          
        const indexes = await shopModel.collection.getIndexes()
console.log(indexes)

        const shop= await shopModel.find({
         
            "location.coordinates": {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [lat, lon]
                },
                $maxDistance: 1000
              }
            }
          })
            console.log(shop)
          res.json({success:true,shop})

    }
    catch(e){
        return res.json({success:true, error:e.message})
    }
}
//---------------------------get shop by shop name ---------------
export const getShopBySearch=async(req,res)=>{
  try {
    const {searchQuery} = req.query;

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query required" });
    }

    const shops = await shopModel.find({
      shopName: { $regex: searchQuery, $options: "i" } // i = case insensitive
    }).limit(10);

    res.json({success:true, shops});
  } catch (err) {
res.json({success:false,error:err.message })
  }
}

// ----------------------------shop details-------------------------- 
export const getShopDetails=async(req,res)=>{
  try{
    const{id}=req.params
    const details=await shopModel.findOne({_id:id})
    console.log(details)
    // let lat=details.location.coordinates[0]
    // let lon=details.location.coordinates[1]
    let lat =details.location.coordinates[0]
    let lon=  details.location.coordinates[1]

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
        lon,
          format: "json"
        },
        headers: {
          "User-Agent": "XeroxApp/1.0 (contact@xeroxapp.com)"
        }
      }
    );
    console.log(response)
    let location=response.data.display_name
    console.log(response.data.display_name)

    res.json({success:true,details,location})
  }
  catch(e){
    console.log(e.message)
    res.json({success:false,error:e.message })
  }
}



// ------------------------------order creation -------------------

export const CreateOrder=async(req,res)=>{
  try{
    const{shopId,count,color,side,page,amount, }=req.body
    const pdfNumber = "PDF-" + crypto.randomBytes(4).toString("hex").toUpperCase();
    // console.log(pdfNumber)
    // console.log(shopId)
    const files =req.files
     let uploadedPdfs=[]
    for (const file of files) {
      
      console.log(file.path)
      let result= await cloudinary.uploader.upload(file.path,{
        // resource_type: "raw",
        folder: "pdfs",
        access_mode: "public",        // 👈 VERY IMPORTANT
        delivery_type: "upload",      // 👈 unblock delivery
        overwrite: true,
        // access_mode: "public", // ✅ important
      })
      console.log('item bol' )
      console.log(result)
      console.log(result.secure_url)
      uploadedPdfs.push({
        url: result.secure_url,
        public_id: result.public_id,
        name:result.original_filename
    
      })
  }

  const shop=await shopModel.findOne({_id:shopId})
  // console.log(shop)

  const order=await orderModel.create({
    pdfNumber,
    pdfs:uploadedPdfs,
    totalPage:page,
    amount,
    shop:shop._id,
    color,
    duplex:side,
    copy:count,
 

  })
  shop.order=order._id
  await shop.save()
  console.log(order)

  res.json({success:true,order})





}
  catch(e){
    console.log(e.message )
    res.json({success:false,error:e.message })
  }
}

export const createPayment=async(req,res)=>{
  try {
    const { amount } = req.body;
    console.log(amount)

    const order = await razorpay.orders.create  ({
      amount: amount * 100, // rupees to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.status(200).json(order);
  } catch (e) {
    res.json({ success:true, error:e.message});
  }
}

export const verifyPayment=async(req,res)=>{
  try{
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      pdfNumber,
      email
    } = req.body;
    console.log(pdfNumber)
    console.log(email)
    console.log(razorpay_signature)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
  
    if (expectedSignature === razorpay_signature) {
      console.log("prachi")
      // save payment in DB
      const order=await orderModel.findOne({pdfNumber})
      order.email=email
      await order.save()
      console.log(order)

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  }
  catch(e){
    res.json({ success:true, error:e.message});
  }
}


//----------------- list all orders ---------------------------

export const  allorders=async(req,res)=>{
  try{
    const order=await orderModel.find({shop:req.userId.id})
    console.log(order)
    res.json({success:true,order})
  }
  catch(e){
    res.json({ success:true, error:e.message});
  }
}


// ---------------- download pdf --------



export const downloadPdf = async (req, res) => {
  try {
    const { url } = req.query;

    const response = await axios.get(url, {
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="document.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    response.data.pipe(res);
  } catch (err) {
    res.status(500).json({ message: "Download failed" });
  }
};



// -------------------------- update  status  --------------------------

export const updateStatus=async(req,res)=>{
  try{
    console.log("baba merija bc ")
    const {pdfNumber,value}=req.body
    console.log(value)
    if(!value){
      return res.json({success:false,msg:"updated value bej mc "})
    }
    // console.log(pdfNumber)
    // console.log(updateValue)
    const order=await orderModel.findOne({pdfNumber})
    const shop=await shopModel.findOne({_id:req.userId.id})
    console.log(shop.location.coordinates[0])
    if(order.tracking === 'complete'){
      return res.json({success:false,error:" order is completed you can't update their status "})
    }
    order.tracking=value
    await order.save()
    console.log(order)
    
    if(order){
      console.log("hii baby ")
      let lat=shop.location.coordinates[0]
      let lon=shop.location.coordinates[1]
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
          lon,
            format: "json"
          },
          headers: {
            "User-Agent": "XeroxApp/1.0 (contact@xeroxapp.com)"
          }
        }
      );
    
      let location=response.data.display_name
     
      console.log(process.env.EMAIL)

      //---------------- sending mail --------------
      const mailoption = {
        from: process.env.EMAIL,
        to: order.email,
        subject: "📄 Your PDF Print Order Details",
        html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      
            <!-- Banner Image -->
            <div style="text-align:center; background:#0f172a;">
              <img 
                src="${shop.shopImage}"
                alt="Print Service"
                style="width:100%; max-height:200px; object-fit:cover;"
              />
            </div>
      
            <!-- Header -->
            <div style="padding:16px; text-align:center;">
              <h2 style="margin:0; color:#0f172a;">Print Order Confirmation</h2>
            </div>
      
            <!-- Body -->
            <div style="padding:20px; color:#334155;">
              <p>Hello 👋,</p>
              <p>Your PDF print order has been received successfully.</p>
      
              <table style="width:100%; border-collapse:collapse; margin-top:16px;">
                <tr>
                  <td style="padding:10px; font-weight:bold;">📄 PDF Number</td>
                  <td style="padding:10px;">${pdfNumber}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:bold;">📄 PDF STATUS</td>
                  <td style="padding:10px;">${order.tracking}</td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px; font-weight:bold;">🏪 Shop Name</td>
                  <td style="padding:10px;">${shop.shopName}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:bold;">📍 Location</td>
                  <td style="padding:10px;">${location}</td>
                </tr>
              </table>
      
              <div style="margin-top:20px; padding:12px; background:#e0f2fe; border-radius:6px;">
                <p style="margin:0; font-size:14px;">
                  Please show your <strong>PDF Number</strong> at the shop to collect your prints.
                </p>
              </div>
      
              <p style="margin-top:20px;">
                Thank you for choosing our service 🙏
              </p>
            </div>
      
            <!-- Footer -->
            <div style="background:#f1f5f9; padding:12px; text-align:center; font-size:12px; color:#64748b;">
              © ${new Date().getFullYear()} Xerox Printing Service
            </div>
      
          </div>
        </div>
        `
      };
      await trans.sendMail(mailoption)
      return res.json({success:true, msg:'email send successfully '})
      
     }  res.json({success:true,order})
  }
  
  catch(e){
    console.log(e.message)
    res.json({ success:true, error:e.message});
  }
}
