import { ClientRepository } from "../../domain/repositories/ClientRepository";

export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string) {
    return this.clientRepository.findById(id);
  }
}
