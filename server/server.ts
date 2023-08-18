import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import accountRouter from "./routes/accountRouter";

const app = express();
const logger = morgan("dev");

app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 86400000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(cookieParser());

app.use(logger);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/account", accountRouter);

export default app;
