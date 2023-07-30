import { Session } from "express-session";

export interface CustomSessionData extends Session {
  loggedIn?: boolean;
  user?: object;
}
