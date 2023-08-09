import { Request, Response } from "express";
import Post from "../models/Post";
import { CustomSession } from "../types/session";
import mongoose from "mongoose";

export const watch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).send("404");
  }
  return res.send("watch");
};

export const postUpload = async (req: Request, res: Response) => {
  const session = req.session as CustomSession;
  const userId = session.user?._id;
  const { title, description, hashtags } = req.body;

  try {
    const newPost = await Post.create({
      title,
      description,
      fileUrl: "example",
      hashtags,
      owner: userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("404");
  }
};

export const putPostEdit = async (req: Request, res: Response) => {
  const postId = req.params.pid;
  const { title, description, hashtags } = req.body;
  await Post.findByIdAndUpdate(postId, {
    title,
    description,
    hashtags,
  });
};

export const postDelete = async (req: Request, res: Response) => {
  const postId = req.params.pid;
  await Post.findByIdAndDelete(postId);
};
