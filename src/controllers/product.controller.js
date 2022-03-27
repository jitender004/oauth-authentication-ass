
const express=require("express");

const router = express.Router();

const Product=require("../models/product.model")
const athentication = require("../middilewars/athentication");
const authorise = require("../middilewars/authorise");

router.post("", athentication, async(req,res)=>{

    req.body.user_id= req.user._id;

     try{
         const product = await Product.create(req.body);
         return res.status(201).send(product);
     }catch(err){
         return res.status(400).send({err:err.message});
     }
});
router.patch("/:_id", athentication,authorise(["admin","seller"]), async(req,res)=>{

    req.body.user_id= req.user._id;

     try{
         const product = await Product.findByIdAndUpdate(req.params._id,req.body,{new:true})
         .lean().exec();
         return res.status(200).send(product);
     }catch(err){
         return res.status(400).send({err:err.message});
     }
});
router.delete("/:_id", athentication, async(req,res)=>{

    req.body.user_id= req.user._id;

     try{
         const product = await Product.findByIdAndDelete(req.params._id)
        
         return res.status(200).send(product);
     }catch(err){
         return res.status(500).send({err:err.message});
     }
});
router.get("", athentication, async(req,res)=>{

    req.body.user_id= req.user._id;

     try{
         const product = await Product.find()
         .lean().exec();
         return res.status(200).send({product:product});
     }catch(err){
         return res.status(400).send({err:err.message});
     }
});

module.exports = router
