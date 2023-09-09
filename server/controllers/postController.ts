import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import { CustomSession } from "../types/session";
import User from "../models/User";
import fs from "fs";
import multer from "multer";
import path from "path";

export const watch = async (req: Request, res: Response) => {
  const { pid } = req.params;
  const post = await Post.findById(pid).populate(
    "owner",
    "name profileImage username"
  );

  if (!post) {
    return res.status(404).send("404");
  }

  return res.status(200).json(post);
};

export const postUpload = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const { title, description, hashtags } = req.body.formData;
  const postId = req.body.postId;
  const post = await Post.findById(postId);

  if (post?.owner.toString() !== userId) {
    return res.status(403).send({ error: "권한이 없습니다." });
  }

  await Post.findByIdAndUpdate(postId, {
    title,
    description,
    hashtags,
  });

  return res.status(200).json();
};

export const imagesUpload = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;

  try {
    const newPost = await Post.create({
      title: "Default",
      description: "Default",
      fileUrl: req.files,
      hashtags: [],
      owner: userId,
    });

    await newPost.save();

    const user = await User.findById(userId);

    if (user) {
      user?.posts.push(newPost._id);
      await user?.save();
    }

    return res.status(200).json(newPost._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("404");
  }
};

export const postEdit = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const postId = req.params.pid;
  const { title, description, hashtags } = req.body;
  const post = await Post.findById(postId);

  if (post?.owner.toString() !== userId) {
    return res.status(403).send({ error: "권한이 없습니다." });
  }

  await Post.findByIdAndUpdate(postId, {
    title,
    description,
    hashtags,
  });

  return res.status(200).json();
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

  return res.status(200).json();
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

  return res.status(200).json();
};
