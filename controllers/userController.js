const User =  require("../models/userModel");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../service/auth");

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
    const sessionId= uuidv4();
    setUser(sessionId , user);
    res.cookie("uid" , sessionId );
    return res.redirect("/");
}

async function  handleUserLogout(req,res){
    console.log("i am in logout" )
  try{

    //clear the cookie with uid key value
     res.clearCookie('uid');
     res.redirect("/");
  } 
  catch{
      res.json({error : "Logout error occured"});
  }
}

module.exports = {
 handleUserSignUp ,
 handleUserLogin,
 handleUserLogout,
};