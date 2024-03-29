import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
dotenv.config();

export default async function ConnectMongoDb(
  app: express.Express
): Promise<void> {
  const MONGO_URL = process.env.MONGO_CONNECTION_STRING;
  const PORT = process.env.PORT || 8000;
  mongoose
    .connect(MONGO_URL!)
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Mongo DB Connected with ${MONGO_URL}\nExpress Server running on ${PORT}`
        );
      });
    })
    .catch(console.error);
}
