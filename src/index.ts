import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongo";
import clientRoutes from "./presentation/routes/clientRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", clientRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
