import { Request, Response } from "express";
import { CustomSession } from "../types/session";
import User from "../models/User";
import Post from "../models/Post";

export const see = async (req: Request, res: Response) => {
  const username = req.params.uid;
  let page = Number(req.query.page) || 1;
  const perPage = 10;

  try {
    const user = await User.findOne({ username })
      .select("name username profileImage")
      .populate({
        path: "posts",
        select:
          "title description fileUrl owner views likes createdAt ratioWidth ratioHeight",
        options: {
          limit: perPage * page,
        },
        populate: {
          path: "owner",
          model: "User",
          select: "name username profileImage",
        },
      });

    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    const userId = user._id;
    const userLiked = await Post.find({ likes: userId })
      .limit(perPage * page)
      .populate({
        path: "owner",
        select: "name username profileImage",
      });

    const userPostsLength = await Post.countDocuments({ owner: userId });
    const userLikedLength = await Post.countDocuments({ likes: userId });

    return res.json({
      profileImg: user.profileImage,
      likedPosts: userLiked,
      userPosts: user,
      length: {
        userPostsLength,
        userLikedLength,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버에서 오류가 발생하였습니다." });
  }
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
