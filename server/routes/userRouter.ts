import express from "express";
import {
  see,
  logout,
  getUserEdit,
  postUserEdit,
  deleteAccount,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getUserEdit).post(postUserEdit);
userRouter.route("/close").delete(deleteAccount);
userRouter.get("/:id[a-zA-Z0-9]", see);

export default userRouter;
