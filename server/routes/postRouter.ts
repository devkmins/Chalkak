// FrameWork
import express from "express";

// Controllers
import {
  watch,
  postUpload,
  postEdit,
  postDelete,
  imagesUpload,
  postViews,
  postLikes,
  similarPosts,
} from "../controllers/postController";

// Middleware
import { imageUpload, protectorMiddleware } from "../middlewares";

const postRouter = express.Router();

postRouter.get("/:pid([0-9a-f]{24})", watch);
postRouter.post(
  "/upload/images",
  imageUpload.array("images", 10),
  imagesUpload
);
postRouter.post("/upload", postUpload);
postRouter.put("/:pid([0-9a-f]{24})/edit", postEdit);
postRouter.put("/:pid([0-9a-f]{24})/views", postViews);
postRouter.put("/:pid([0-9a-f]{24})/likes", postLikes);
postRouter.delete("/:pid([0-9a-f]{24})/delete", postDelete);
postRouter.get("/similarPosts", similarPosts);

export default postRouter;
