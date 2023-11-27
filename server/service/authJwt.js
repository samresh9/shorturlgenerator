const jwt = require("jsonwebtoken");
const jwtSecret = "samresh";
function setUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, jwtSecret);
}

async function getUser(token) {
  if (!token) return null;
  console.log("token", token);
  try {
    const user = jwt.verify(token, jwtSecret);
    return user;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.log("jsontoken error", err);
      return null;
    } else {
      return null;
    }
  }
}

module.exports = {
  setUser,
  getUser,
};
