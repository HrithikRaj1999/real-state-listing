import express from "express";
import {
  GetTokenController,
  GoogleController,
  SignInController,
  SignOutController,
  SignUpController,
} from "../controller/auth.controller";
export const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
authRouter.post("/signin", SignInController);
authRouter.get("/signout/:id", SignOutController);
authRouter.get("/getToken/:id", GetTokenController);
authRouter.post("/google", GoogleController);
