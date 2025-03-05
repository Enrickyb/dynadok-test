import mongoose, { Schema, Document } from "mongoose";

// Definição da interface para tipagem
export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do MongoDB
const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ClientModel = mongoose.model<IClient>("Client", ClientSchema);
