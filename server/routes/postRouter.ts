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
postRouter.post("/upload", /*protectorMiddleware,*/ postUpload);
postRouter.put(
  "/:pid([0-9a-f]{24})/edit",
  /*protectorMiddleware,*/ putPostEdit
);
postRouter.delete(
  "/:pid([0-9a-f]{24})/delete",
  /*protectorMiddleware,*/
  postDelete
);

export default postRouter;
