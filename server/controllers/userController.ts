import { Request, Response } from "express";
import { CustomSession } from "../types/session";
import User from "../models/User";

export const see = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const userPosts = await User.findById(userId).populate({
    path: "posts",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  return res.json(userPosts);
};

export const logout = (req: Request, res: Response) => {
  const session = req.session as CustomSession;

  session.destroy((error) => {
    if (error) {
      return res.send("error");
    } else {
      return res.send("Logout");
    }
  });
};

export const getUserEdit = (req: Request, res: Response) => res.send("Edit");

export const postUserEdit = (req: Request, res: Response) => res.send("Edit");

export const changePassword = (req: Request, res: Response) =>
  res.send("Change");

export const deleteAccount = (req: Request, res: Response) =>
  res.send("Delete Account");
