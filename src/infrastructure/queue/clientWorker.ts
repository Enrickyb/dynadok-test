import { Worker } from "bullmq";
import { redisClient } from "../cache/redis";

const worker = new Worker(
  "clientQueue",
  async (job) => {
    console.log(`🔄 Processando job: ${job.id} - Dados:`, job.data);
    // Aqui poderíamos, por exemplo, enviar um e-mail de boas-vindas ao cliente.
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} processado com sucesso!`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} falhou:`, err);
});
