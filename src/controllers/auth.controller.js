

const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const newToken = (user)=>{
   
   return jwt.sign({user}, process.env.scerect_key);
   
}

const register = async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});

        if(user){
            return res.status(400).send({Message:"email already exists"})
        }
       user = await User.create(req.body);
       const token = newToken(user);

       return res.status(200).send({user,token});
     
    }catch(err){
        res.status(400).send(err.message);
    }
}

const login = async (req,res)=>{
    try{
     const user = await User.findOne({email:req.body.email});
     if(!user){
        return res.status(400).send("wroung email and password")
     }

     const match = user.checkPassword(req.body.password);
     if(!match){
         return res.status(400).send("wroung email or password");
     }
     const token = newToken(user);

     return res.status(200).send({user,token});


    }catch(err){
        res.status(400).send(err.message);
    }
}
module.exports={register,login,newToken}