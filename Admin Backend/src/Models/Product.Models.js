import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
productName :{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
productDescription:{
    type:String,
    required:true,
},
productImages:{
    type:String,
    required:true,

},
feedback:{
    type:string,
}


})

export const Product = mongoose.model('products',productSchema)