import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export const home = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.json(posts);
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      username,
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("404");
  }
};

export const getLogin = (req: Request, res: Response) => res.send("Login");

export const postLogin = (req: Request, res: Response) => res.send("Login");

export const search = (req: Request, res: Response) => res.send("Search");
