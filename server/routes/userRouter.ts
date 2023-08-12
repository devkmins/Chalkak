import express from "express";
import {
  see,
  logout,
  getUserEdit,
  postUserEdit,
} from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getUserEdit).post(postUserEdit);
userRouter.get("/:uid([a-zA-Z0-9]+)", see);

export default userRouter;
