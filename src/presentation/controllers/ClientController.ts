import { Request, Response } from "express";
import { CreateClientUseCase } from "../../application/use-cases/CreateClientUseCase";
import { UpdateClientUseCase } from "../../application/use-cases/UpdateClientUseCase";
import { GetClientUseCase } from "../../application/use-cases/GetClientUseCase";
import { ListClientsUseCase } from "../../application/use-cases/ListClientsUseCase";
import { ClientRepository } from "../../domain/repositories/ClientRepository";
import { addClientToQueue } from "../../infrastructure/queue/clientQueue";

const clientRepository = new ClientRepository();
const createClientUseCase = new CreateClientUseCase(clientRepository);
const updateClientUseCase = new UpdateClientUseCase(clientRepository);
const getClientUseCase = new GetClientUseCase(clientRepository);
const listClientsUseCase = new ListClientsUseCase(clientRepository);

export class ClientController {
  static async create(req: Request, res: Response) {
    try {
      const client = await createClientUseCase.execute(req.body);
      await addClientToQueue(client);
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar cliente" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const client = await updateClientUseCase.execute({
        id: req.params.id,
        ...req.body,
      });
      return res.status(200).json(client);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar cliente" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const client = await getClientUseCase.execute(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      return res.status(200).json(client);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar cliente" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const clients = await listClientsUseCase.execute();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar clientes" });
    }
  }
}
