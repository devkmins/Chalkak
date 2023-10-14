import { atom } from "recoil";

export const loggedInState = atom({
  key: "loggedInState",
  default: false,
});

export const isLoggedOutState = atom({
  key: "isLoggedOutState",
  default: false,
});
