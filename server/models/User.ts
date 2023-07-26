import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  profileImage: String,
  totalViews: { type: Number, ref: "Post" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model<IUser>("User", userSchema);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

export default User;
