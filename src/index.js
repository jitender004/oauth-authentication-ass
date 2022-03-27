const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const {register,login, newToken}=require("./controllers/auth.controller");

const app = express();

app.use(express.json());

app.use("/users",userController);

app.post("/register", register)

app.post("/login",login);

const passport = require("./configs/google-auth")

app.use("/products",productController);

app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {failureRedirect: '/login', session:false}),

    function(req,res){
        const token = newToken(req.user);
        return res.status(200).send({user:req.user,token})
    });




app.listen(5120, async()=>{
    try{
        await connect();
        console.log("listing port on 5120");
    }catch(err){
        console.log(err.message);
    }
});