import { Document, Schema, model } from "mongoose";

export interface IPvt {
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
