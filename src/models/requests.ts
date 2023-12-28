import { Document, Schema, model } from "mongoose";

export interface IEscortRequest {
  name: string;
  age: number;
  location: string;
  status: string;

  escort_id: string;
  client_id: string;
  client_name: string;
  createdAt: number;
}

export interface EscortRequest extends IEscortRequest, Document {}

const messagesSchema = new Schema<EscortRequest>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  escort_id: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

messagesSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});
const EscortRequests = model<EscortRequest>("EscortRequests", messagesSchema);

export default EscortRequests;
