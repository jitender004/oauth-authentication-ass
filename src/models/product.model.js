

const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    titel:{type:String, required:true },
    body:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},

},{
    versionKey:false,
    timestamps:true,
});


const Product = mongoose.model("product",productSchema);
module.exports= Product;