import { atom } from "recoil";

interface ISessionData {
  email: string;
  name: string;
  username: string;
  profileImage: string;
  socialOnly: boolean;
  _id: string;
}

export const loggedInState = atom({
  key: "loggedInState",
  default: false,
});

export const sessionState = atom<ISessionData>({
  key: "sessionState",
  default: {
    email: "",
    name: "",
    username: "",
    profileImage: "",
    socialOnly: false,
    _id: "",
  },
});

export const recentSearchState = atom({
  key: "recentSearchState",
  default: JSON.parse(localStorage.getItem("keywords") as string)
    ? JSON.parse(localStorage.getItem("keywords") as string)
    : [],
});

export const currentSearchState = atom({
  key: "currentSearchState",
  default: "",
});

export const mainPageScrollYState = atom({
  key: "mainPageScrollYState",
  default: 0,
});

export const isBackToMainState = atom({
  key: "isBackToMainState",
  default: false,
});

export const userPageScrollYState = atom({
  key: "userPageScrollYState",
  default: 0,
});

export const isBackToUserPageState = atom({
  key: "isBackToUserPageState",
  default: false,
});

export const searchPostListScrollYState = atom({
  key: "searchPostListScrollYState",
  default: 0,
});

export const isBackToSearchPostListState = atom({
  key: "isBackToSearchPostListState",
  default: false,
});

export const similarPostsScrollYState = atom({
  key: "similarPostsScrollYState",
  default: 0,
});

export const isBackToSimilarPostsState = atom({
  key: "isBackToSimilarPostsState",
  default: false,
});

export const isLoggedOutState = atom({
  key: "isLoggedOutState",
  default: false,
});

export const isEditedState = atom({
  key: "isEditedState",
  default: false,
});

export const currentPostState = atom({
  key: "currentPostState",
  default: "",
});

export const currentUserPageState = atom({
  key: "currentUserPageState",
  default: "",
});

export const currentPostPageScrollState = atom({
  key: "currentPostPageScrollState",
  default: 1,
});

export const totalPostsPagesState = atom({
  key: "totalPostsPagesState",
  default: 1,
});
