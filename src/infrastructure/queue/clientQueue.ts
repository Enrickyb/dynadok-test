import { Queue } from "bullmq";

let clientQueue: Queue;

if (process.env.NODE_ENV === "test") {
  clientQueue = {
    add: async () => Promise.resolve(),
  } as unknown as Queue;
} else {
  clientQueue = new Queue("clientQueue", {
    connection: {
      host: process.env.REDIS_HOST || "redis",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });
}

export { clientQueue };

export const addClientToQueue = async (data: any) => {
  await clientQueue.add("new-client", data, { attempts: 3 });
};
