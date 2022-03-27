
const authorise = (permittedRoles)=>{
    return (req,res,next)=>{

        const user = req.user;
        let permitted = false;
    
        permittedRoles.map(role =>{
            if(user.role.includes(role)){
                permitted=true;
            }
    
        });
        if(permitted){
            return next();
        }else{
            return res.status(401).send({message : "You are not authorised to perform this operation"});
        }
        

    }
   
} 

module.exports = authorise;