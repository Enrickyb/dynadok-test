import { ClientRepository } from "../../domain/repositories/ClientRepository";
import { ClientModel } from "../../domain/entities/Client";
import { redisClient } from "../../infrastructure/cache/redis";

// Simula os módulos para evitar conexões reais
jest.mock("../../domain/entities/Client");
jest.mock("../../infrastructure/cache/redis");

describe("ClientRepository", () => {
  let clientRepository: ClientRepository;

  beforeEach(() => {
    clientRepository = new ClientRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("findById deve retornar o cliente do cache se existir", async () => {
    const fakeClient = { _id: "1", name: "Teste" };
    // Simula retorno do cache:
    (redisClient.get as jest.Mock).mockResolvedValue(
      JSON.stringify(fakeClient)
    );

    const client = await clientRepository.findById("1");

    expect(redisClient.get).toHaveBeenCalledWith("client:1");
    expect(client).toEqual(fakeClient);
  });

  it("findById deve buscar no banco se não existir no cache e armazenar no cache", async () => {
    // Simula cache nulo:
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    const fakeClient = { _id: "2", name: "Teste 2" };
    // Simula retorno do método findById do model:
    ClientModel.findById = jest.fn().mockResolvedValue(fakeClient);
    (redisClient.set as jest.Mock).mockResolvedValue("OK");

    const client = await clientRepository.findById("2");
    expect(redisClient.get).toHaveBeenCalledWith("client:2");
    expect(ClientModel.findById).toHaveBeenCalledWith("2");
    expect(redisClient.set).toHaveBeenCalledWith(
      "client:2",
      JSON.stringify(fakeClient),
      "EX",
      60
    );
    expect(client).toEqual(fakeClient);
  });
});
