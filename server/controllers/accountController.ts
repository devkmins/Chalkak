// Library
import bcrypt from "bcrypt";

// Module
import fs from "fs";

// Models
import User from "../models/User";
import Post from "../models/Post";

// Types
import { Request, Response } from "express";
import { CustomSession } from "../types/session";

export const editProfile = async (req: Request, res: Response) => {
  const { name: newName, email: newEmail, username: newUsername } = req.body;
  const session = req.session as CustomSession;
  const username = session.user?.username;

  const user = await User.findOne({ username: username });
  const findUserByUsername = await User.findOne({ username: newUsername });
  const findUserByEmail = await User.findOne({ email: newEmail });

  if (
    findUserByEmail &&
    user?._id.toString() !== findUserByEmail._id.toString() &&
    findUserByUsername &&
    user?._id.toString() !== findUserByUsername._id.toString()
  ) {
    return res.status(400).json({
      emailError: "이미 존재하는 이메일입니다.",
      usernameError: "이미 존재하는 사용자 이름입니다.",
    });
  }

  if (
    findUserByEmail &&
    user?._id.toString() !== findUserByEmail._id.toString()
  ) {
    return res.status(400).json({ emailError: "이미 존재하는 이메일입니다." });
  }

  if (
    findUserByUsername &&
    user?._id.toString() !== findUserByUsername._id.toString()
  ) {
    return res
      .status(400)
      .json({ usernameError: "이미 존재하는 사용자 이름입니다." });
  }

  const updatedUser = await User.findOneAndUpdate(
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

export const editProfileImg = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const username = session.user?.username;
  const user = await User.findOne({ username });

  fs.unlink(`${user?.profileImage}`, (error) => {});

  const updateUser = await User.findOneAndUpdate(
    { username },
    { profileImage: req.file?.path }
  );

  if (user) {
    const userSessionData = {
      email: user.email,
      name: user.name,
      username: user.username,
      socialOnly: user.socialOnly,
      profileImage: req.file?.path,
      _id: user._id,
    };

    session.user = userSessionData;

    session.save();
  }

  await user?.save();

  return res.status(200).json(req?.file?.path);
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

      const userPosts = await User.findOne({ username })
        .select("posts")
        .populate("posts");

      userPosts?.posts.map((post) => {
        Object(post)?.fileUrl?.map((file: any) => {
          fs.unlink(`${file.path}`, (error) => {});
        });
      });

      await Post.deleteMany({ _id: { $in: posts } });

      session.destroy((error) => {
        if (error) {
          return res.send("error");
        } else {
          return res.send("Logout");
        }
      });

      await User.findOneAndDelete({ username });
    } else {
      return res
        .status(400)
        .json({ passwordError: "비밀번호가 일치하지 않습니다." });
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
    } else {
      return res.status(400).json({
        currentPasswordError: "현재 비밀번호는 올바르지 않은 비밀번호입니다.",
      });
    }
  } else {
    return res
      .status(400)
      .json({ confirmPasswordError: "비밀번호가 일치하지 않습니다." });
  }

  return res.status(200).send("비밀번호 변경이 완료되었습니다.");
};
