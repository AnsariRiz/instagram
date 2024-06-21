const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    description: { type: String, max: 500 },
    imgurl: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);