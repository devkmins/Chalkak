import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";

export const home = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.json(posts);
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, email, username, password, confirmPassword } = req.body;
  const existUsername = await User.exists({ username });
  const existEmail = await User.exists({ email });

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "passwordConfirmError" });
  }

  if (existUsername && existEmail) {
    return res.status(400).json({
      error: ["usernameExistError", "emailExistError"],
    });
  } else if (existUsername) {
    return res.status(400).json({ error: "usernameExistError" });
  } else if (existEmail) {
    return res.status(400).json({ error: "emailExistError" });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
    return res
      .status(200)
      .json({ message: "회원가입이 성공적으로 완료되었습니다." });
  } catch (error) {
    return res.status(400).json({ error: "회원가입에 실패했습니다." });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "loginUsernameError" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({ error: "loginPasswordError" });
  }

  return res.status(200).json({ message: "로그인이 완료되었습니다." });
};

export const search = (req: Request, res: Response) => res.send("Search");
