import { Request, Response } from "express";
import User from "../models/User";
import { Error, FilterQuery, Mongoose } from "mongoose";

export const see = (req: Request, res: Response) => {
  return res.send("user");
};

export const logout = (req: Request, res: Response) => res.send("Logout");

export const getUserEdit = (req: Request, res: Response) => res.send("Edit");

export const postUserEdit = (req: Request, res: Response) => res.send("Edit");

export const deleteAccount = (req: Request, res: Response) =>
  res.send("Delete Account");
