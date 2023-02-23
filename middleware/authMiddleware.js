const {getUser} = require("../service/auth");

async function restrictToLogedinUserOnly(req,res,next){
  // console.log("Inside middleware" ,req);
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}
async function getUserIfLogedin(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}
module.exports = {
    restrictToLogedinUserOnly ,
    getUserIfLogedin,
}