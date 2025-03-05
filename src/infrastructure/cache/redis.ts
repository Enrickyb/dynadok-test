import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "redis";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

export const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

// Evento de conexão bem-sucedida
redisClient.on("connect", () => {
  console.log("⚡ Conectado ao Redis");
});

// Evento de erro
redisClient.on("error", (err) => {
  console.error("❌ Erro no Redis:", err);
});

// Exportando corretamente para evitar erro
export default redisClient;
