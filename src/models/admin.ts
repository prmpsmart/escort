import { Document, Schema, model } from "mongoose";
import { User } from "../utils/user";

export interface IAdmin extends User {
  name: string;
  username: string;
}

export interface Admin extends Document, IAdmin {}

const adminSchema = new Schema<Admin>({
  name: {
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
  lastSeen: {
    type: Number,
    default: Date.now,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

adminSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});

export const Admins = model<Admin>("Admins", adminSchema);
