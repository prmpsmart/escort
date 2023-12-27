import { Document, Schema, model } from "mongoose";

interface IClient {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: number;
  image: string;
}

export interface DClient extends Document, IClient {}

const clientsSchema = new Schema<DClient>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

clientsSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});

export const Clients = model<DClient>("Clients", clientsSchema);
