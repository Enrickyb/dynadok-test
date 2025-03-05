import { Queue } from "bullmq";
import { redisClient } from "../cache/redis";

export const clientQueue = new Queue("clientQueue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

export const addClientToQueue = async (data: any) => {
  await clientQueue.add("new-client", data, { attempts: 3 });
};
