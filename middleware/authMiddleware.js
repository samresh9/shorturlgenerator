const {getUser} = require("../service/authJwt");

async function checkAuthentication(req,res,next){
   const token = req.cookies?.uid;
   req.user= null;
   if(!token) return next();
   const user = await getUser(token);
   req.user = user;
   return next();

}
function restrictTo(roles
   = []){
  //higher order function
  return function(req,res,next){
    if(!req.user) return res.redirect("/login");
    
    console.log(roles ,"role");
    if(!roles.includes(req.user.role) ) return res.end("Unauthorised");
    return next();
  };
}

module.exports = {
   checkAuthentication,
   restrictTo,
}
