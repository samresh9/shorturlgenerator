const { getUser } = require("../service/authJwt");

async function checkAuthentication(req, res, next) {
  const authHeaderValue = req.headers["authorization"];
  req.user = null;
  console.log(req)
  if (!authHeaderValue) return next();
  const token = authHeaderValue.split(" ")[1];
  const user = await getUser(token);
  console.log(user, "users");
  req.user = user;
  return next();
}
function restrictTo(roles = []) {
  //higher order function
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ error: "Unauthoriaed" });

    console.log(roles, "role");
    if (!roles.includes(req.user.role)) return res.json("Unauthorised");
    return next();
  };
}

module.exports = {
  checkAuthentication,
  restrictTo,
};
