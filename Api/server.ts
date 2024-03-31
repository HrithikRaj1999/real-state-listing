import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
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
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectMongoDb(app);
app.use("/", testRouter);
app.use("/api/checkCookie", verifyToken, cookieController);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use(errorHandler);
export const redisClient = new Redis(process.env.REDIS_URL!);
export default app;
