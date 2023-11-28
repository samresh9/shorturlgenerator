const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/authJwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function handleUserSignUp(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json({ user });
  } catch (err) {
    next(err);
  }
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
  // res.cookie("uid", token);
  res.json({ data: { token, content: { userName: user.name } } });
  // return res.redirect("/");
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
