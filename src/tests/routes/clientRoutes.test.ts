import request from "supertest";
import express from "express";
import clientRoutes from "../../presentation/routes/clientRoutes";
import { connectDB } from "../../infrastructure/database/mongo";
import mongoose from "mongoose";

jest.setTimeout(30000); // Garante tempo suficiente para os testes

const app = express();
app.use(express.json());
app.use("/api", clientRoutes);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Client Routes", () => {
  it("POST /api/clients - deve criar um cliente", async () => {
    const res = await request(app).post("/api/clients").send({
      name: "Teste",
      email: "teste@example.com",
      phone: "123456789",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
