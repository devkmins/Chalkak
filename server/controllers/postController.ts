// Library
import path from "path";

// Module
import fs from "fs";

// Middleware
import multer from "multer";

// Models
import Post from "../models/Post";
import User from "../models/User";

// Types
import { NextFunction, Request, Response } from "express";
import { CustomSession } from "../types/session";

export const watch = async (req: Request, res: Response) => {
  const { pid } = req.params;
  const post = await Post.findById(pid).populate(
    "owner",
    "name profileImage username"
  );

  if (!post) {
    return res.status(404).json("게시글을 찾을 수 없습니다.");
  }

  return res.status(200).json(post);
};

export const postUpload = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const { title, description, hashtags } = req.body.formData;
  const { ratioWidth, ratioHeight } = req.body.ratio;
  const files = req.body.files;

  const newPost = await Post.create({
    title,
    description,
    hashtags,
    fileUrl: files,
    owner: userId,
    ratioWidth,
    ratioHeight,
  });

  await newPost.save();

  const user = await User.findById(userId);

  if (user) {
    user?.posts.push(newPost._id);
    await user?.save();
  }

  return res.status(200).json("게시글 업로드가 완료되었습니다.");
};

export const imagesUpload = async (req: Request, res: Response) => {
  const files = req.files;

  return res.status(200).json(files);
};

export const postEdit = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const postId = req.params.pid;
  const { title: newTitle, description, hashtags } = req.body;
  const post = await Post.findById(postId);

  if (post?.owner.toString() !== userId) {
    return res.status(403).send({ error: "권한이 없습니다." });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title: newTitle ? newTitle : post?.title,
      description: description,
      hashtags: hashtags,
    },
    { new: true }
  ).populate("owner", "name profileImage username");

  return res.status(200).json(updatedPost);
};

export const postViews = async (req: Request, res: Response) => {
  const postId = req.params.pid;
  const { views } = req.body;
  const post = await Post.findById(postId);

  if (views) {
    await Post.findByIdAndUpdate(postId, {
      views,
    });

    await post?.save();
  }

  return res.status(200).json("조회수 업데이트가 완료되었습니다.");
};

export const postLikes = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const postId = req.params.pid;
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
  }

  if (userId) {
    const userIndex = post.likes.indexOf(userId);

    if (post.likes.includes(userId)) {
      post.likes.splice(userIndex, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json(post.likes);
  }
};

export const postDelete = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const postId = req.params.pid;
  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (post?.owner.toString() !== userId) {
    return res.status(403).send({ error: "권한이 없습니다." });
  }

  post?.fileUrl.map((file) => {
    fs.unlink(`${file.path}`, (error) => {});
  });

  user?.posts.splice(
    user.posts.findIndex((post) => post._id.toString() === postId),
    1
  );

  await user?.save();

  await Post.findByIdAndDelete(postId);

  return res.status(200).json("게시글 삭제가 완료되었습니다.");
};

export const similarPosts = async (req: Request, res: Response) => {
  let page = Number(req.query.page) || 1;
  const perPage = 10;
  const { postTitle, postId } = req.query;

  if (postTitle) {
    try {
      const posts = await Post.find({
        $and: [
          { _id: { $ne: postId } },
          {
            $or: [
              { title: { $regex: postTitle, $options: "i" } },
              { description: { $regex: postTitle, $options: "i" } },
              { hashtags: { $regex: postTitle, $options: "i" } },
            ],
          },
        ],
      })
        .populate({
          path: "owner",
          select: "username name _id profileImage",
        })
        .select("-hashtags")
        .limit(page * perPage);

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "오류가 발생했습니다." });
    }
  } else {
    return;
  }
};
