
const jwt = require("jsonwebtoken");
const jwtSecret = "keytosigntoken";
function setUser( user){
    const payload = {
        id: user._id,
        email: user.email
    };
 return jwt.sign(payload , jwtSecret);
};

function getUser(token){
   if(!token) return null;
  return  jwt.verify(token , jwtSecret)
};

module.exports = {
    setUser ,
    getUser,
}