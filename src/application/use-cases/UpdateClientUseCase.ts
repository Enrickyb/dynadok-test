import { ClientRepository } from "../../domain/repositories/ClientRepository";

interface UpdateClientDTO {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: UpdateClientDTO) {
    const { id, ...updateData } = data;
    return this.clientRepository.update(id, updateData);
  }
}
