import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import session from "express-session";
import MongoStore from "connect-mongo";

import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 86400000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

export default app;
