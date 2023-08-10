import { NextFunction } from "express";
import { CustomSession } from "../types/session";

export const protectorMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  if ((req.session as CustomSession).loggedIn) {
    return next();
  } else {
    const error = new Error("Login first");
    return next(error);
  }
};

export const publicOnlyMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  if (!(req.session as CustomSession).loggedIn) {
    return next();
  } else {
    const error = new Error("Not authorized");
    return next(error);
  }
};
