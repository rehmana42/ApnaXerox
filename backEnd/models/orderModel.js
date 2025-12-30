import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    pdfNumber:{
        type:String,
        unique:true

    },
   
    pdfs: [
        {
          url: String,
          public_id:String,
          name:String
        },
      ],
    totalPage:{type:Number},
    amount:{type:Number},
    paymentStatus: {
        type: String,
        default: "PAID",
      },
     tracking:{
      type:'String',
      default:"pending"
     },
     shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'shop'
        },
      color:{type:String}  ,
     duplex:{type:String} ,
     copy:{type:Number},
     email:{type:String}
    
})

const orderModel=mongoose.model('order',orderSchema)
export default orderModel