const User =  require("../models/userModel");
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../service/authJwt");

async function handleUserSignUp (req, res){
   const {name , email , password} = req.body;
   await User.create({
    name,
    email,
    password,
   });
   return res.render("home");
};

async function handleUserLogin(req, res){
    const {name , email , password} = req.body;
    const user = await User.findOne({email , password});
    if(!user){
        return res.render("login" , {error:"Invalid Username or Password"});
    };
    
    const token  = setUser(user);
    res.cookie("uid" , token );
    return res.redirect("/");
}

async function handleUserLogout(req,res){
      res.clearCookie("uid");
      res.redirect("/");
}

module.exports = {
 handleUserSignUp ,
 handleUserLogin,
 handleUserLogout,
}; 