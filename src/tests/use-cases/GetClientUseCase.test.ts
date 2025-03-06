import { GetClientUseCase } from "../../application/use-cases/GetClientUseCase";

describe("GetClientUseCase", () => {
  it("deve retornar um cliente pelo id", async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "Teste",
        email: "teste@example.com",
        phone: "123456789",
      }),
    };

    const getClientUseCase = new GetClientUseCase(mockRepository as any);
    const client = await getClientUseCase.execute("12345");
    expect(mockRepository.findById).toHaveBeenCalledWith("12345");
    expect(client).toHaveProperty("_id");
    expect(client?.email).toBe("teste@example.com");
  });

  it("deve retornar null se o cliente não existir", async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const getClientUseCase = new GetClientUseCase(mockRepository as any);
    const client = await getClientUseCase.execute("nonexistent");
    expect(mockRepository.findById).toHaveBeenCalledWith("nonexistent");
    expect(client).toBeNull();
  });
});
