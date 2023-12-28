import { Document, Schema, model } from "mongoose";
import { User } from "../utils/user";

interface IClient extends User {
  firstName: string;
  lastName: string;
  username: string;
  image: string;
}

export interface Client extends Document, IClient {}

const clientsSchema = new Schema<Client>({
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
  lastSeen: {
    type: Number,
    default: Date.now,
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

export const Clients = model<Client>("Clients", clientsSchema);
