import { Session } from "express-session";
import { Types } from "mongoose";

type CustomSession = Session & {
  loggedIn?: boolean;
  user?: {
    email: string;
    name: string;
    username: string;
    socialOnly: boolean;
    profileImage: string | undefined;
    _id: Types.ObjectId;
  };
};

export { CustomSession };
