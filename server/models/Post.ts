import mongoose, { Types } from "mongoose";

interface IPost {
  title: String;
  description: String;
  fileUrl: String;
  createdAt: Date;
  tags: String[];
  owner: Types.ObjectId;
  thumbnail: String;
  views: Number;
}

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  createdAt: Date,
  tags: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId },
  thumbnail: String,
  views: Number,
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
