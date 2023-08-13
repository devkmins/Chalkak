import { Request, Response } from "express";
import User from "../models/User";
import { CustomSession } from "../types/session";

export const editProfile = async (req: Request, res: Response) => {
  const { name: newName, email: newEmail, username: newUsername } = req.body;
  const session = req.session as CustomSession;
  const username = session.user?.username;
  const user = await User.findOneAndUpdate(
    { username },
    { name: newName, email: newEmail, username: newUsername }
  );

  if (session.user) {
    const newUserSessionData = {
      email: newEmail,
      name: newName,
      username: newUsername,
      socialOnly: session.user?.socialOnly,
      profileImage: session.user?.profileImage,
      _id: session.user._id,
    };

    session.user = newUserSessionData;
  }

  return res.status(200).json(session.user);
};

export const closeAccount = (req: Request, res: Response) => {};

export const changePassword = (req: Request, res: Response) => {};
