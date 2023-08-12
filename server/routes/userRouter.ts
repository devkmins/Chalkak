import express from "express";
import {
  see,
  logout,
  getUserEdit,
  postUserEdit,
  deleteAccount,
  changePassword,
} from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getUserEdit).post(postUserEdit);
userRouter.post("/change-password", changePassword);
userRouter.route("/close").delete(deleteAccount);
userRouter.get("/:uid([a-zA-Z0-9]+)", see);

export default userRouter;
