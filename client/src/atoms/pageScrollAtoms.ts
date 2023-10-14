import { atom } from "recoil";

export const currentPostPageScrollState = atom({
  key: "currentPostPageScrollState",
  default: 1,
});

export const currentUserPageScrollState = atom({
  key: "currentUserPageScrollState",
  default: 1,
});

export const currentSimilarPostsPageScrollState = atom({
  key: "currentSimilarPostsPageScrollState",
  default: 1,
});

export const totalPostsPageScrollState = atom({
  key: "totalPostsPageScrollState",
  default: 1,
});
