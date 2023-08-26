import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";
import { CustomSession } from "../types/session";

export const home = async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate("owner", "username name");

  if (posts) {
    return res.json(posts);
  }
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, email, username, password, confirmPassword } = req.body;
  const existUsername = await User.exists({ username });
  const existEmail = await User.exists({ email });

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "passwordConfirmError" });
  }

  if (existUsername && existEmail) {
    return res.status(400).json({
      error: ["usernameExistError", "emailExistError"],
    });
  } else if (existUsername) {
    return res.status(400).json({ error: "usernameExistError" });
  } else if (existEmail) {
    return res.status(400).json({ error: "emailExistError" });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
    return res
      .status(200)
      .json({ message: "회원가입이 성공적으로 완료되었습니다." });
  } catch (error) {
    return res.status(400).send({ error: "회원가입에 실패했습니다." });
  }
};

export const getLogin = (req: Request, res: Response) => {
  const session = req.session as CustomSession;

  if (session.loggedIn) {
    return res.send({
      loggedIn: session.loggedIn,
      user: session.user,
    });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) {
    return res.status(400).json({ error: "loginUsernameError" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({ error: "loginPasswordError" });
  }

  const userSessionData = {
    email: user.email,
    name: user.name,
    username: user.username,
    socialOnly: user.socialOnly,
    profileImage: user.profileImage,
    _id: user._id,
  };

  const session = req.session as CustomSession;

  session.loggedIn = true;
  session.user = userSessionData;

  return res.status(200).send({
    loggedIn: session.loggedIn,
    user: session.user,
  });
};

export const search = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { hashtags: { $regex: keyword, $options: "i" } },
      ],
    }).populate("owner");

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "검색 중 오류가 발생했습니다." });
  }
};
