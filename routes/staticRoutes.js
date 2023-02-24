const express = require("express");
const URL = require("../models/url");
const router = express.Router();


router.get("/" , async(req,res)=>{
   //console.log("we are in static" ,req.user);
    if(!req.user) return res.render("home");
    //if(req.cookies === null) return res.render("home");
   const allUrls = await URL.find({CreatedBy : req.user._id});
   return res.render("home" , {urls : allUrls});
});

router.get("/signup" ,  async(req,res)=>{
   res.render("signup");
});

router.get("/login" ,  async(req,res)=>{
   res.render("login");
});
module.exports = router;