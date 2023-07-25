import { Request, Response } from "express";
import Post from "../models/Post";

export const watch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).send("404");
  }
  return res.send("watch");
};

export const getUpload = (req: Request, res: Response) => {
  res.send("Upload");
};

export const postUpload = async (req: Request, res: Response) => {
  const { title, description, hashtags } = req.body;

  try {
    const newPost = await Post.create({
      title,
      description,
      fileUrl: "example",
      hashtags,
      //owner: userObjectId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("404");
  }
};

export const getPostEdit = (req: Request, res: Response) => {
  res.send("hi");
};

export const patchPostEdit = async (req: Request, res: Response) => {
  const postId = req.params.pid;
  const { title, description, hashtags } = req.body;
  await Post.findByIdAndUpdate(postId, {
    title,
    description,
    hashtags,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.pid;
  await Post.findByIdAndDelete(postId);
};
