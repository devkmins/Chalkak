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
globalRouter.post("/join", postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
