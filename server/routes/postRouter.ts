import express from "express";
import {
  watch,
  postUpload,
  putPostEdit,
  postDelete,
} from "../controllers/postController";
import { protectorMiddleware } from "../middlewares";

const postRouter = express.Router();

postRouter.get("/:pid([0-9a-f]{24})", watch);
postRouter.post("/upload", postUpload);
postRouter.put("/:pid([0-9a-f]{24})/edit", putPostEdit);
postRouter.delete("/:pid([0-9a-f]{24})/delete", postDelete);

export default postRouter;
