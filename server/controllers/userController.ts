import { Request, Response } from "express";
import { CustomSession } from "../types/session";
import User from "../models/User";
import Post from "../models/Post";

export const see = async (req: Request, res: Response) => {
  const username = req.params.uid;
  const user = await User.findOne({ username })
    .select("name username profileImage")
    .populate({
      path: "posts",
      select: "title description fileUrl owner views likes createdAt",
      populate: {
        path: "owner",
        model: "User",
        select: "name username profileImage",
      },
    });

  const userId = user?._id;
  const userLiked = await Post.find({ likes: userId }).populate({
    path: "owner",
    select: "name username profileImage",
  });

  return res.json({
    profileImg: user?.profileImage,
    likedPosts: userLiked,
    userPosts: user,
  });
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
