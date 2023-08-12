import express from "express";
import {
  changePassword,
  closeAccount,
  editProfile,
} from "../controllers/accountController";

const accountRouter = express.Router();

accountRouter.put("/", editProfile);
accountRouter.delete("/close", closeAccount);
accountRouter.patch("/password", changePassword);

export default accountRouter;
