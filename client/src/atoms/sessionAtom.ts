import { atom } from "recoil";

interface ISessionData {
  email: string;
  name: string;
  username: string;
  profileImage: string;
  socialOnly: boolean;
  _id: string;
}

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
