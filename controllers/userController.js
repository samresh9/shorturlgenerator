const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/authJwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);
  await User.create({
    name,
    email,
    password: hash,
  });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", { error: "create user" });
  }

  const result = await bcrypt.compare(password, user.password);
  if (result == !true)
    return res.render("login", { error: "Invalid Username or Password match" });

  const token = setUser(user);
  console.log(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
};
