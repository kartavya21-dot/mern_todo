import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mangoose from "mongoose";
import { setServers } from "dns";
setServers(["8.8.8.8", "1.1.1.1"])

import todoRoute from "./routes/todoRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Start the server
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use("/service/todo", todoRoute);

mangoose.set("strictQuery", true);
mangoose
  .connect(CONNECTION_URL, {family: 4})
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)),
  )
  .catch((error) => {
    console.log("URL: ", CONNECTION_URL);
    console.log(error.message);
  });