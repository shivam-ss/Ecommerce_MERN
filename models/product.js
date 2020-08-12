const mongoose = require("mongoose");
const {ObjectId} =mongoose.Schema  //we need the object id from the mongoose schema



const productSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true,  // l and r trim
        required: true,
        maxlength: 32
    },

    description:{
        type: String,  
        required: true,
        maxlength: 3000
    },
    
    price:{
        type: Number,
        trim: true,  // l and r trim
        required: true,
        maxlength: 32
    },

    category:{
        type: ObjectId,
        ref: "Category",
        required: true,
        
    },

    quantity: {
        type: Number,    
    },

    photo: {
        data: Buffer,
        contentType: String,
    },

    shipping: {
        required:  false, // if you use = here, then error shorthand property initializer
        type: Boolean
    }
    
  



}, 
{timestamp: true}

)




module.exports=mongoose.model("Product", productSchema);