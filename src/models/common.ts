import { Schema } from "mongoose";

export interface ChatModel {
  id?: string;
  sender_id: string;
  receiver_id: string;
  messageType: string;
  data: string;
  create_timestamp: number;
}

export interface User {
  id?: any;
  email: string;
  password?: string;
  createdAt?: number;
  lastSeen?: number;
  contacts: Record<string, ChatModel>;
}

export interface Media {
  filename: string;
  data: string;
}

export const chatModelSchema = new Schema<ChatModel>({
  sender_id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  messageType: { type: String, required: true },
  data: { type: String, required: true },
  create_timestamp: { type: Number, default: Date.now },
});
