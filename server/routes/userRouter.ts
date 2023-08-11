import express from "express";
import {
  see,
  logout,
  getUserEdit,
  postUserEdit,
  deleteAccount,
  changePassword,
  myPage,
} from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/my-page", protectorMiddleware, myPage);
userRouter.post("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getUserEdit)
  .post(postUserEdit);
userRouter.post("/change-password", protectorMiddleware, changePassword);
userRouter.route("/close").all(protectorMiddleware).delete(deleteAccount);
userRouter.get("/:uid[a-zA-Z0-9]", see);

export default userRouter;
