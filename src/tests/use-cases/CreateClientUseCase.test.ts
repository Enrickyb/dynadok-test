import { CreateClientUseCase } from "../application/use-cases/CreateClientUseCase";

describe("CreateClientUseCase", () => {
  it("deve criar um cliente com sucesso", async () => {
    // Criando um mock do repositório com método create
    const mockRepository = {
      create: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "Teste",
        email: "teste@example.com",
        phone: "123456789",
      }),
    };

    const createClientUseCase = new CreateClientUseCase(mockRepository as any);

    const clientData = {
      name: "Teste",
      email: "teste@example.com",
      phone: "123456789",
    };

    const client = await createClientUseCase.execute(clientData);

    expect(mockRepository.create).toHaveBeenCalledWith(clientData);
    expect(client).toHaveProperty("_id");
    expect(client.email).toBe("teste@example.com");
  });
});
