import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
   

})

const Cart = mongoose.model('Cart',cartSchema)