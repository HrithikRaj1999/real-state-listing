import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import mongoose from "mongoose";
import { logger } from "../logger/logger";
// all the middle ware executes in sequence thus error middle ware must be at the bottom
const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction, // Including next for completeness, even though it’s not used
) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = 500;
  let message = "Internal Server Error";

  logger.error(error); // Log the error for server-side review.

  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = error.message;
  } else if (isHttpError(error)) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Ensure consistent error response structure.
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
