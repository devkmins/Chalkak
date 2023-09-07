import mongoose, { Types } from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 75 },
  description: { type: String, trim: true, maxLength: 150 },
  fileUrl: [{ type: Object, required: true }],
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, required: true, trim: true }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  thumbnail: String,
  views: { type: Number, default: 1, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
