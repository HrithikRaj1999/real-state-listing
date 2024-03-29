import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES, MESSAGES } from "../constants/data";
import { logger } from "../logger/logger";
import { User } from "../models/user.model";
import { redisClient } from "../../server";
import { GoogleSignInControllerBodyType, SignInBodyType, SignUpBodyType } from "../dataTypes";

dotenv.config();
export const SignUpController: RequestHandler<
  unknown,
  unknown,
  SignUpBodyType,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return next(createHttpError(400, MESSAGES.MISSING_PARAMETERS));
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(409, MESSAGES.EMAIL_USED));
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: MESSAGES.SUCCESS_REGISTERED,
      user: { ...newUser.toObject(), password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

export const SignInController: RequestHandler<
  unknown,
  unknown,
  SignInBodyType,
  unknown
> = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const { email, password, keepMeSignedIn } = req.body;
  if (!email || !password)
    return next(createHttpError(400, MESSAGES.MISSING_PARAMETERS));
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return next(createHttpError(401, MESSAGES.FAILED_SIGNIN)); // to avoid brute force attack send a general message
    const isPassValid = await bcrypt.compare(
      password,
      existingUser?.password || "",
    );
    if (!isPassValid) return next(createHttpError(401, MESSAGES.FAILED_SIGNIN)); // to avoid brute force attack send a general message
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

    // token will be only saved when keep me signed in will be enabled
    // else no token
    if (keepMeSignedIn) {
      existingUser.token = token; // Assign token to existingUser if keep me sign in is used
      await existingUser.save(); // Save changes to MongoDB
    }
    return res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({
        success: true,
        message: MESSAGES.SUCCESS_SIGNIN,
        user: {
          ...existingUser.toObject(),
          password: undefined, //we don't want to send password to client side
          __v: undefined,
          token: undefined,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const GoogleController: RequestHandler<
  unknown,
  unknown,
  GoogleSignInControllerBodyType,
  unknown
> = async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  const user = await User.findOne({ email });
  const JWT_SECRET = process.env.JWT_SECRET!;
  //if user Exists then simple log in with new token
  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      return res
        .status(HTTP_STATUS_CODES.OK)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true, // set to true if your client and server communicate over HTTPS
        })
        .send({
          success: true,
          message: MESSAGES.SUCCESS_SIGNIN,
          user: {
            ...user.toObject(),
            password: undefined,
            __v: undefined,
            token: undefined,
          },
        });
    }
    //if user doesnt Exists then store in mongo db and return that user.
    else {
      const customPassword = crypto.randomBytes(16).toString("hex");
      const newUser = await User.create({
        username: name,
        email: email,
        password: customPassword,
        avatar: photoUrl,
      });
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

      return res
        .status(HTTP_STATUS_CODES.CREATED)
        .cookie("access_token", token, { httpOnly: true })
        .send({
          success: true,
          message: MESSAGES.SUCCESS_SIGNIN,
          user: {
            ...newUser.toObject(),
            password: undefined,
            __v: undefined,
            token: undefined,
          },
        });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const SignOutController: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user?.token) {
      await User.findByIdAndUpdate(id, { $unset: { token: 1 } });
    }
    redisClient.flushall();
    res.clearCookie("access_token");
    res
      .status(HTTP_STATUS_CODES.OK)
      .send({ success: true, message: MESSAGES.SUCCESS_LOGOUT });
  } catch (error) {
    next(error);
  }
};

export const GetTokenController: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, "No User Found"),
      );
    const token = user?.token;
    if (!token)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, "No Token Found"),
      );
    const newToken = jwt.sign({ id: user._id }, JWT_SECRET);
    user.token = newToken; // Assign a new token to existingUser if keep me sign in is used
    await user.save();
    return res
      .cookie("access_token", newToken, { httpOnly: true, secure: true })
      .status(HTTP_STATUS_CODES.OK)
      .send({ success: true, message: "Cookie Generated" });
  } catch (error) {
    next(error);
  }
};
