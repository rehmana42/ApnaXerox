import mongoose from "mongoose";

const shopSChema=mongoose.Schema({
    shopName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    shopImage:{
        type:String
    },
    blackAndWhite:{
          type:Number  
    },
    color:{
        type:Number
    },
    spiralBinding:{
        type:Number
    },
    location: {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: [Number], // [lng, lat]
      },
    bankName:{
        type:String,
    },
    accountName:{
        type:String
    },
    ifscCode:{
        type:String
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    },
    shopStatus:{
    type: String,
  default: 'open'
    }
})

// shopSChema.index({location:"2dsphere"})

const shopModel=mongoose.model('shop',shopSChema)

export default shopModel;