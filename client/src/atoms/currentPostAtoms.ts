import { atom } from "recoil";

export const currentPostState = atom({
  key: "currentPostState",
  default: "",
});

export const currentUserPageState = atom({
  key: "currentUserPageState",
  default: "",
});
