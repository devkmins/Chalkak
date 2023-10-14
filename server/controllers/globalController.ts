// Library
import bcrypt from "bcrypt";

// Models
import Post from "../models/Post";
import User from "../models/User";

// Types
import { Request, Response } from "express";
import { CustomSession } from "../types/session";

export const home = async (req: Request, res: Response) => {
  let page = Number(req.query.page) || 1;
  const perPage = 10;

  try {
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    const posts = await Post.find({})
      .limit(page * perPage)
      .populate("owner", "username name profileImage");

    return res.json({
      postsData: posts,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버에서 오류가 발생했습니다." });
  }
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, email, username, password, confirmPassword } = req.body;
  const existUsername = await User.exists({ username });
  const existEmail = await User.exists({ email });

  let errors: {
    usernameError?: string;
    emailError?: string;
    confirmPasswordError?: string;
  } = {};

  if (existUsername) {
    errors.usernameError = "이미 존재하는 아이디입니다.";
  }

  if (existEmail) {
    errors.emailError = "이미 존재하는 이메일입니다.";
  }

  if (password !== confirmPassword) {
    errors.confirmPasswordError = "비밀번호가 일치하지 않습니다.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
    return res.status(200).json("회원가입이 완료되었습니다.");
  } catch (error) {
    return res.status(400).json("에러가 발생하였습니다.");
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
    return res
      .status(400)
      .json({ userError: "사용자의 이름 또는 이메일이 올바르지 않습니다." });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res
      .status(400)
      .json({ passwordError: "비밀번호가 올바르지 않습니다." });
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
  let page = Number(req.query.page) || 1;
  const perPage = 10;

  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { hashtags: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate({
        path: "owner",
        select: "username name _id profileImage",
      })
      .limit(page * perPage);

    const totalPostsLength = await Post.countDocuments({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { hashtags: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json({ posts, totalPostsLength });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "검색 중 오류가 발생했습니다." });
  }
};

export const topViewsPosts = async (req: Request, res: Response) => {
  const top10Posts = await Post.find({})
    .populate("owner", "username name profileImage")
    .sort({ views: -1 })
    .limit(10);

  if (top10Posts) {
    return res.json(top10Posts);
  } else {
    return res.json("에러가 발생하였습니다.");
  }
};
