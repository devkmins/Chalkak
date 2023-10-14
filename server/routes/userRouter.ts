// FrameWork
import express from "express";

// Controllers
import { see, logout } from "../controllers/userController";

// Middleware
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/logout", logout);
userRouter.get("/:uid([a-zA-Z0-9]+)", see);

export default userRouter;
