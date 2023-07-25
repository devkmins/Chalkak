import mongoose from "mongoose";

interface IUser {
  id: String;
  username: String;
  email: String;
  password: String;
  social: Boolean;
  images: String[];
  avatarUrl: String;
  totalViews: Number;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  images: [{ type: String }],
  avatarUrl: String,
  totalViews: Number,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
