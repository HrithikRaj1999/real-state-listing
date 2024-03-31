import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { cookieController } from "./src/controller/cookie.controller";
import { authRouter } from "./src/routes/auth.routes";
import { listingRouter } from "./src/routes/listing.routes";
import { userRouter } from "./src/routes/user.routes";
import { Redis } from "ioredis";
import { verifyToken } from "./src/util/verifyUser";
import errorHandler from "./src/util/error";
import connectMongoDb from "./mongoConnect";
import { testRouter } from "./src/routes/test.router";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app: Express = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    methods: ["GET", "PUT", "OPTIONS", "DELETE", "POST"], 
    credentials: true,
  })
);
connectMongoDb(app);

app.use("/", testRouter);
app.use("/api/checkCookie", verifyToken, cookieController);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
const __folderName = path.resolve();
app.use(express.static(path.join(__folderName, "../client/build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__folderName, "client", "build", "index.html"));
});
app.use(errorHandler);
export const redisClient = new Redis(process.env.REDIS_URL!);
export default app;
