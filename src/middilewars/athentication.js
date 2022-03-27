require('dotenv').config();
const jwt = require('jsonwebtoken');

const vaerifyToken = (token)=>{

    return new Promise((resolve,reject)=>{
        var decoded = jwt.verify(token, process.env.scerect_key,(err,decoded)=>{
            if(err) reject (err);
    
            return resolve(decoded);
        });

    });
    
}



const athentication = async (req,res,next)=>{
   if(!req.headers.authorization){
       return res.status(400).send({message: "Token not found and incorrect"});
   }
   if(!req.headers.authorization.startsWith("Bearer ")){
    return res.status(400).send({message: "Token not found and incorrect"});
   }

   const token = req.headers.authorization.trim().split(" ")[1]
let decoded;

   try{
       decoded = await vaerifyToken(token);
   }catch(err){
       return res.send(400).send({message: "Token not found and incorrect"});
   }
   console.log(decoded);
   req.user = decoded.user;
   return next();
}

module.exports = athentication;