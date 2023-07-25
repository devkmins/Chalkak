import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

export default app;
