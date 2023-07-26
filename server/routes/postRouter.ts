import express from "express";
import {
  watch,
  postUpload,
  patchPostEdit,
  postDelete,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/:pid([0-9a-f]{24})", watch);
postRouter.route("/upload").post(postUpload);
postRouter.route("/:pid([0-9a-f]{24})/edit").patch(patchPostEdit);
postRouter.route("/:pid([0-9a-f]{24})/delete").delete(postDelete);

export default postRouter;
