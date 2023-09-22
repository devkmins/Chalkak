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

export const isLoggedOutState = atom({
  key: "isLoggedOutState",
  default: false,
});

export const isEditedState = atom({
  key: "isEditedState",
  default: false,
});
