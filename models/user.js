const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (doc, rto) => {
    rto.id = rto._id;
    delete rto._id;
    delete rto.__v;
    delete rto.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
