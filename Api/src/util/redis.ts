import { Redis } from "ioredis";
import { DEFAULT_EXPIRATION } from "../constants/data";
import { redisClient } from "../../server";

export const getOrSetCache = (
  key: string,
  cb: () => Promise<any>,
): Promise<string | null | undefined> | "" => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data !== null) return resolve(data);
      const newData = await cb();
      await redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(newData));
      resolve(JSON.stringify(newData));
    });
  });
};
