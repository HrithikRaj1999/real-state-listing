import express from "express";
import {
  deleteUserController,
  getUserDetailsController,
  removeUserPicController,
  showUserListingController,
  updateUserController,
  updateUserPicController,
} from "../controller/user.controller";
import { verifyToken } from "../util/verifyUser";
export const userRouter = express.Router();

userRouter.put("/update/:id", verifyToken, updateUserController);
userRouter.delete("/delete/:id", verifyToken, deleteUserController);
userRouter.put("/removePic/:id", verifyToken, removeUserPicController);
userRouter.put("/updatePic/:id", verifyToken, updateUserPicController);
userRouter.get("/listings/:id", verifyToken, showUserListingController);

userRouter.get(
  `/get-user-details/:userId`,
  verifyToken,
  getUserDetailsController,
);
