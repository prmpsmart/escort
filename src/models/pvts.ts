import { Document, Schema, model } from "mongoose";
import { User } from "../utils";

export interface IPvt extends User {
  pvt: string;
  timestamp: number;
}

export interface Pvt extends Document, IPvt {}

const adminSchema = new Schema<Pvt>({
  pvt: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    default: Date.now,
  },
});


export const Pvts = model<Pvt>("Pvts", adminSchema);
