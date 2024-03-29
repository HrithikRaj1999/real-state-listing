import { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "../constants/data";
import { logger } from "../logger/logger";
export const cookieController: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res) => {
  logger.info("Token Exists");
  res
    .status(HTTP_STATUS_CODES.OK)
    .send({ success: true, message: "Token Exists" });
};
