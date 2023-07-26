import express from "express";
import {
  getLogin,
  home,
  search,
  postJoin,
  postLogin,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
