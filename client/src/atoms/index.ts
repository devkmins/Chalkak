import { atom } from "recoil";

interface ISessionData {
  email: string;
  name: string;
  username: string;
  socialOnly: boolean;
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
  },
});