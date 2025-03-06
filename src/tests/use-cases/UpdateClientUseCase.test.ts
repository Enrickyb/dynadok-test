import { UpdateClientUseCase } from "../../application/use-cases/UpdateClientUseCase";

describe("UpdateClientUseCase", () => {
  it("deve atualizar um cliente com sucesso", async () => {
    const mockRepository = {
      update: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "Teste Atualizado",
        email: "teste@example.com",
        phone: "987654321",
      }),
    };

    const updateClientUseCase = new UpdateClientUseCase(mockRepository as any);
    const clientData = {
      id: "12345",
      name: "Teste Atualizado",
      phone: "987654321",
    };

    const updatedClient = await updateClientUseCase.execute(clientData);
    expect(mockRepository.update).toHaveBeenCalledWith("12345", {
      name: "Teste Atualizado",
      phone: "987654321",
    });
    expect(updatedClient?.name).toBe("Teste Atualizado");
  });
});
