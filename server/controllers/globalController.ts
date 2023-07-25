import { Request, Response } from "express";
import Post from "../models/Post";

export const home = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.json(posts);
};

export const getJoin = (req: Request, res: Response) => res.send("Join");

export const postJoin = (req: Request, res: Response) => res.send("Join");

export const getLogin = (req: Request, res: Response) => res.send("Login");

export const postLogin = (req: Request, res: Response) => res.send("Login");

export const search = (req: Request, res: Response) => res.send("Search");
