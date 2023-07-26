import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";

export const home = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.json(posts);
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, email, id, password, confirmPassword } = req.body;
  const existId = await User.exists({ id });
  const existEmail = await User.exists({ email });

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "passwordConfirmError" });
  }

  if (existId && existEmail) {
    return res.status(400).json({
      error: ["idExistError", "emailExistError"],
    });
  } else if (existId) {
    return res.status(400).json({ error: "idExistError" });
  } else if (existEmail) {
    return res.status(400).json({ error: "emailExistError" });
  }

  try {
    const newUser = await User.create({
      name,
      id,
      email,
      password,
    });
  } catch (error) {
    return res.status(400);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });

  if (!user) {
    return res.status(400).json({ error: "loginIdError" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({ error: "loginPasswordError" });
  }
};

export const search = (req: Request, res: Response) => res.send("Search");
