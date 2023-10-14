import { atom } from "recoil";

export const mainPageScrollYState = atom({
  key: "mainPageScrollYState",
  default: 0,
});

export const userPageScrollYState = atom({
  key: "userPageScrollYState",
  default: 0,
});

export const searchPostListScrollYState = atom({
  key: "searchPostListScrollYState",
  default: 0,
});

export const similarPostsScrollYState = atom({
  key: "similarPostsScrollYState",
  default: 0,
});
