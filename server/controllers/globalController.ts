import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

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
    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });
  } catch (error) {
    return res.status(400);
  }
};

export const getLogin = (req: Request, res: Response) => res.send("Login");

export const postLogin = (req: Request, res: Response) => res.send("Login");

export const search = (req: Request, res: Response) => res.send("Search");
