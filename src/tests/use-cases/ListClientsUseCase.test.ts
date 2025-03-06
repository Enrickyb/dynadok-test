import { ListClientsUseCase } from "../../application/use-cases/ListClientsUseCase";

describe("ListClientsUseCase", () => {
  it("deve retornar uma lista de clientes", async () => {
    const mockClients = [
      {
        _id: "1",
        name: "Cliente 1",
        email: "cliente1@example.com",
        phone: "123456789",
      },
      {
        _id: "2",
        name: "Cliente 2",
        email: "cliente2@example.com",
        phone: "987654321",
      },
    ];
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue(mockClients),
    };

    const listClientsUseCase = new ListClientsUseCase(mockRepository as any);
    const clients = await listClientsUseCase.execute();
    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(clients).toEqual(mockClients);
  });
});
