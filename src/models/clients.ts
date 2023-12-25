import { Document, Schema, model } from "mongoose";

interface Client extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;

  getFullName(): string;

  login(email: string, password: string): Promise<Client>;
}

const clientSchema = new Schema<Client>({
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

clientSchema.statics.login = function (
  email: string,
  password: string
): boolean {
  // login logic
  return false;
};

clientSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

clientSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});

const Client = model<Client>("Client", clientSchema);

export default Client;
