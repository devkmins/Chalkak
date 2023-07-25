import express from "express";
import {
  watch,
  getUpload,
  postUpload,
  getPostEdit,
  patchPostEdit,
  deletePost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/:pid([0-9a-f]{24})", watch);
postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter
  .route("/:pid([0-9a-f]{24})/edit")
  .get(getPostEdit)
  .patch(patchPostEdit);
postRouter.route("/:pid([0-9a-f]{24})/delete").delete(deletePost);

export default postRouter;
