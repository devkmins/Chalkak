import express from "express";
import {
  home,
  search,
  postJoin,
  postLogin,
  getLogin,
} from "../controllers/globalController";
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.post("/join", publicOnlyMiddleware, postJoin);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
