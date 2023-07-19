import express from "express";
import {
  watch,
  getUpload,
  postUpload,
  getPostEdit,
  postPostEdit,
  deletePost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.route("/:id([0-9a-f]{24})/edit").get(getPostEdit).post(postPostEdit);
postRouter.route("/:id([0-9a-f]{24})/delete").delete(deletePost);

export default postRouter;
