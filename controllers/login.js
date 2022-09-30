require("dotenv").config();
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user && !passwordCorrect) {
    return res.status(401).json({
      error: "user or password incorrect",
    });
  }

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  console.log(token);
  res.status(200).json({ username, name: user.name, token });
});

module.exports = loginRouter;
