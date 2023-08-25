import { atom } from "recoil";

interface ISessionData {
  email: string;
  name: string;
  username: string;
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
