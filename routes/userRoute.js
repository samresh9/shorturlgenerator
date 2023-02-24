const express = require("express");
const User =  require("../models/userModel");
const {handleUserSignUp , handleUserLogin , handleUserLogout} = require("../controllers/userController")
const router =  express.Router();

router.post("/" , handleUserSignUp);

router.post("/login" , handleUserLogin);
router.post("/logout", handleUserLogout);
module.exports = router;