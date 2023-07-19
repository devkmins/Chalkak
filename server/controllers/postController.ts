import { Request, Response } from "express";
import Post from "../models/Post";

export const watch = (req: Request, res: Response) => res.send("Watch");

export const getUpload = (req: Request, res: Response) => res.send("Upload");

export const postUpload = (req: Request, res: Response) => res.send("Upload");

export const getPostEdit = (req: Request, res: Response) => res.send("Edit");

export const postPostEdit = (req: Request, res: Response) => res.send("Edit");

export const deletePost = (req: Request, res: Response) =>
  res.send("Delete Post");
