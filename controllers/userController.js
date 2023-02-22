const User =  require("../models/userModel");

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
    return res.redirect("/");
}



module.exports = {
 handleUserSignUp ,
 handleUserLogin
};