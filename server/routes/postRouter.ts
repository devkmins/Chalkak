import express from "express";
import {
  watch,
  postUpload,
  postEdit,
  postDelete,
} from "../controllers/postController";
import { imageUpload, protectorMiddleware } from "../middlewares";

const postRouter = express.Router();

postRouter.get("/:pid([0-9a-f]{24})", watch);
postRouter.post("/upload", imageUpload.single("images"), postUpload);
postRouter.put("/:pid([0-9a-f]{24})/edit", postEdit);
postRouter.delete("/:pid([0-9a-f]{24})/delete", postDelete);

export default postRouter;
