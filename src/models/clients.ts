import { Document, Schema, model } from "mongoose";

interface Clients extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;

  getFullName(): string;
}

const clientsSchema = new Schema<Clients>({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

clientsSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

clientsSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});

const Clients = model<Clients>("Clients", clientsSchema);

export default Clients;
