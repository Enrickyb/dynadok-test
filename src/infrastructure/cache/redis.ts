import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redisClient: any;

if (process.env.NODE_ENV === "test") {
  // Em ambiente de teste, usamos funções mock do Jest para que possamos manipulá-las nos testes
  redisClient = {
    on: jest.fn(),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue("OK"),
    quit: jest.fn().mockResolvedValue(undefined),
  };
} else {
  const REDIS_HOST = process.env.REDIS_HOST || "redis";
  const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

  redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
  });

  redisClient.on("connect", () => {
    console.log("⚡ Conectado ao Redis");
  });

  redisClient.on("error", (err: any) => {
    console.error("❌ Erro no Redis:", err);
  });
}

export { redisClient };
export default redisClient;
