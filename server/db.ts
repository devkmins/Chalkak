// Library
import mongoose from "mongoose";

// Module
import "dotenv/config";

mongoose.connect(process.env.DB_URL as string, {});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error: Error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
