import { atom } from "recoil";

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
