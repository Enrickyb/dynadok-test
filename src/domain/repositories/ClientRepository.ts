import { BaseRepository } from "./BaseRepository";
import { IClient, ClientModel } from "../entities/Client";
import { redisClient } from "../../infrastructure/cache/redis";

export class ClientRepository extends BaseRepository<IClient> {
  constructor() {
    super(ClientModel);
  }

  async findById(id: string): Promise<IClient | null> {
    // Verifica se os dados estão no cache
    const cachedClient = await redisClient.get(`client:${id}`);
    if (cachedClient) {
      return JSON.parse(cachedClient);
    }

    // Busca no banco de dados se não estiver no cache
    const client = await this.model.findById(id);
    if (client) {
      await redisClient.set(`client:${id}`, JSON.stringify(client), "EX", 60); // Cache de 60 segundos
    }

    return client;
  }
}
