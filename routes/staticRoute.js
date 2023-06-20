const express = require("express");
const URL  = require("../models/url");
const Users  = require("../models/userModel");
const {restrictTo} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin/urls" ,  restrictTo(["Admin"]), async (req,res)=>{
   const allUrls = await URL.find({}).populate('CreatedBy' , "name")
   console.log(allUrls);
   const userName = await Users.find();
   console.log("users" ,userName);
   return res.render("home" , {urls : allUrls });
});

router.get("/" , restrictTo(["Normal" , "Admin"]), async(req,res)=>{
   console.log("we are in static");
   console.log(req.user.id , "in static");
    console.log("after")
   const allUrls = await URL.find({CreatedBy : req.user.id});
   const userName = await Users.find({_id : req.user.id});
   console.log("users" , userName);
   return res.render("home" , {urls : allUrls , name: userName[0].name} );
});

router.get("/signup" ,  async(req,res)=>{
   res.render("signup");
});

router.get("/login" ,  async(req,res)=>{
   res.render("login");
});
module.exports = router;