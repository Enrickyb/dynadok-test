import { Request, Response } from "express";
import { CreateClientUseCase } from "../../application/use-cases/CreateClientUseCase";
import { ClientRepository } from "../../domain/repositories/ClientRepository";

const clientRepository = new ClientRepository();
const createClientUseCase = new CreateClientUseCase(clientRepository);

export class ClientController {
  static async create(req: Request, res: Response) {
    try {
      const client = await createClientUseCase.execute(req.body);
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar cliente" });
    }
  }
}
