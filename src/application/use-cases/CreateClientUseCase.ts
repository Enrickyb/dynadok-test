import { ClientRepository } from "../../domain/repositories/ClientRepository";

interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: CreateClientDTO) {
    return this.clientRepository.create(data);
  }
}
