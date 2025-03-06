import { ClientRepository } from "../../domain/repositories/ClientRepository";

export class ListClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    return this.clientRepository.findAll();
  }
}
