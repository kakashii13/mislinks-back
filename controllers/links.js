const linkRouter = require("express").Router();
const Link = require("../models/links");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (req) => {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

linkRouter.get("/", async (req, res) => {
  const links = await Link.find({}).populate("user", { username: 1, name: 1 });
  res.json(links);
});

linkRouter.post("/", async (req, res) => {
  const { title, url, description, category } = req.body;
  const token = tokenExtractor(req);
  const decodedToken = jwt.decode(token);
  if (!token || !decodedToken) {
    return res.status(401).json({
      error: "token invalid or expired",
    });
  }
  const user = await User.findById(decodedToken.id);
  const link = new Link({
    title,
    url,
    description,
    category,
    fav: false,
    user: user._id,
  });
  const linkSaved = await link.save();
  user.links = user.links.concat(linkSaved._id);
  await user.save();
  res.status(200).json(linkSaved);
});

linkRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, url, description, category, fav, user } = req.body;
  const token = tokenExtractor(req);
  const decodedToken = jwt.decode(token);
  if (!token || !decodedToken || decodedToken.id !== user.id) {
    return res.status(401).json({
      error: "token invalid or expired",
    });
  }

  const newLink = {
    title,
    url,
    description,
    category,
    fav,
    user: decodedToken.id,
  };

  await Link.findByIdAndUpdate(id, newLink);
  res.status(200);
});

linkRouter.delete("/:id", async (req, res) => {
  //add token for delete
  const id = req.params.id;
  await Link.findByIdAndRemove(id);
  res.status(204);
});

module.exports = linkRouter;
