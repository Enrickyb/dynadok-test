import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/meu_projeto";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    if (process.env.NODE_ENV === "test") {
      // Em testes, lança o erro para que possamos lidar com ele sem interromper o processo
      throw error;
    }
    process.exit(1);
  }
};
