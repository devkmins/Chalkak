import { Request, Response } from "express";
import User from "../models/User";
import { CustomSession } from "../types/session";
import bcrypt from "bcrypt";
import Post from "../models/Post";

export const editProfile = async (req: Request, res: Response) => {
  const { name: newName, email: newEmail, username: newUsername } = req.body;
  const session = req.session as CustomSession;
  const username = session.user?.username;
  const user = await User.findOneAndUpdate(
    { username },
    { name: newName, email: newEmail, username: newUsername }
  );

  if (session.user) {
    const newUserSessionData = {
      email: newEmail,
      name: newName,
      username: newUsername,
      socialOnly: session.user?.socialOnly,
      profileImage: session.user?.profileImage,
      _id: session.user._id,
    };

    session.user = newUserSessionData;
  }

  return res.status(200).json(session.user);
};

export const closeAccount = async (req: Request, res: Response) => {
  if (res.headersSent) {
    return;
  }

  const { password } = req.body;
  const session = req.session as CustomSession;
  const username = session.user?.username;
  const user = await User.findOne({ username });

  if (user) {
    const comparePassword = await bcrypt.compare(password, user?.password);

    if (comparePassword) {
      const posts = user.posts;

      posts.forEach(async (post) => await Post.findByIdAndDelete(post));

      session.destroy((error) => {
        if (error) {
          return res.send("error");
        } else {
          return res.send("Logout");
        }
      });

      await User.findOneAndDelete({ username });
    }
  }

  return res.status(200);
};

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, newConfirmPassword } = req.body;
  const session = req.session as CustomSession;
  const username = session.user?.username;
  const user = await User.findOne({ username });

  if (newPassword === newConfirmPassword && user) {
    const comparePassword = await bcrypt.compare(
      currentPassword,
      user?.password
    );

    if (comparePassword) {
      user.password = newPassword;

      await user.save();
    }
  }

  return res.status(200).send("Good");
};
