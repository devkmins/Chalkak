// FrameWork
import express from "express";

// Controllers
import {
  home,
  search,
  postJoin,
  postLogin,
  getLogin,
  topViewsPosts,
} from "../controllers/globalController";

// Middleware
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/posts", home);
globalRouter.post("/join", postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search/:keyword", search);
globalRouter.get("/topViewsPosts", topViewsPosts);

export default globalRouter;
