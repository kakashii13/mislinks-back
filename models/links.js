const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

LinkSchema.set("toJSON", {
  transform: (doc, rt) => {
    rt.id = rt._id;
    delete rt._id;
    delete rt.__v;
  },
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;
