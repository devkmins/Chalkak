// FrameWork
import express from "express";

// Controllers
import {
  changePassword,
  closeAccount,
  editProfile,
  editProfileImg,
} from "../controllers/accountController";

// Middleware
import { avatarImgUpload } from "../middlewares";

const accountRouter = express.Router();

accountRouter.put("/", editProfile);
accountRouter.post(
  "/profileImg",
  avatarImgUpload.single("profileImg"),
  editProfileImg
);
accountRouter.delete("/close", closeAccount);
accountRouter.patch("/password", changePassword);

export default accountRouter;
