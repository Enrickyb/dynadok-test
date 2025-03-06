import { Worker } from "bullmq";
import { redisClient } from "../cache/redis";

const worker = new Worker(
  "clientQueue",
  async (job) => {
    console.log(`🔄 Processando job: ${job.id} - Dados:`, job.data);

    // simula o envio de um log para um sistema de monitoramento
    await redisClient.set(
      `log:${job.id}`,
      JSON.stringify({ data: job.data, status: "processing" }),
      "EX",
      60
    );
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} processado com sucesso!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} falhou:`, err);
});
