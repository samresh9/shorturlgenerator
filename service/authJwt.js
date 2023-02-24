
const jwt = require("jsonwebtoken");
const jwtSecret = "keytosigntoken";
function setUser( user){
    const payload = {
        id: user._id,
        email: user.email
    };
 return jwt.sign(payload , jwtSecret);
};

async function getUser(token){
   if(!token) return null;
  try{
     const user = await jwt.verify(token , jwtSecret);
     return user;
  }catch(err){
    if(err instanceof jwt.JsonWebTokenError){
        console.log("jsontoken error");
        return null;
        
    }else{
        return null;
    }
   
  }
 
};

module.exports = {
    setUser ,
    getUser,
}