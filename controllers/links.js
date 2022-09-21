const linkRouter = require("express").Router();
const Link = require("../models/links");

linkRouter.get("/", async (req, res) => {
  const links = await Link.find({});
  res.json(links);
});

linkRouter.post("/", async (req, res) => {
  const { title, url, description } = req.body;
  const link = new Link({
    title,
    url,
    description,
  });

  const linkSaved = await link.save();
  res.status(200).json(linkSaved);
});

linkRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Link.findByIdAndRemove(id);
  res.status(204);
});

module.exports = linkRouter;
