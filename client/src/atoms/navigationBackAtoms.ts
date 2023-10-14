import { atom } from "recoil";

export const isBackToMainState = atom({
  key: "isBackToMainState",
  default: false,
});

export const isBackToUserPageState = atom({
  key: "isBackToUserPageState",
  default: false,
});

export const isBackToSearchPostListState = atom({
  key: "isBackToSearchPostListState",
  default: false,
});

export const isBackToSimilarPostsState = atom({
  key: "isBackToSimilarPostsState",
  default: false,
});
