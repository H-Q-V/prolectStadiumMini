const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    comments: { type: String },
    stadium: { type: mongoose.Schema.Types.ObjectId, ref: "Stadium" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
