import { atom } from "recoil";

export const loggedInState = atom({
  key: "loggedInState",
  default: false,
});

export const sessionState = atom({
  key: "sessionState",
  default: {},
});
