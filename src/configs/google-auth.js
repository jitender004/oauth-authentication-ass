var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config
 
const User = require("../models/user.model");
passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5120/auth/google/callback",
    passReqToCallback   : true
  },
 async function(request, accessToken, refreshToken, profile, cb) {
   
    let user = await User.findOne({email:profile?._json?.email}).lean().exec();

    if(!user){
      user=await User.create({
        name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        role:"customer"
      });
    }
    console.log(user);
     
      return cb (null, user);
   
  }
));

module.exports=passport;