import { Request, Response } from "express";

export const home = (req: Request, res: Response) => res.send("Home");

export const getJoin = (req: Request, res: Response) => res.send("Join");

export const postJoin = (req: Request, res: Response) => res.send("Join");

export const getLogin = (req: Request, res: Response) => res.send("Login");

export const postLogin = (req: Request, res: Response) => res.send("Login");

export const search = (req: Request, res: Response) => res.send("Search");
