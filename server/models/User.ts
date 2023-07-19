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
  id: String,
  username: String,
  email: String,
  password: String,
  social: Boolean,
  images: [{ type: String }],
  avatarUrl: String,
  totalViews: Number,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
