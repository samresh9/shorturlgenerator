const {getUser} = require("../service/authJwt");

async function restrictToLogedinUserOnly(req,res,next){
  // console.log("Inside middleware" ,req);
   
    const token = req.cookies?.uid;
    const user = await getUser(token);
    //console.log("authmiddle" ,user)
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}
async function getUserIfLogedin(req,res,next){
    const userUid = req.cookies?.uid;
    const user = await getUser(userUid);
   //console.log("middleware",user);
    req.user = user;
    next();
}
module.exports = {
    restrictToLogedinUserOnly ,
    getUserIfLogedin,
}