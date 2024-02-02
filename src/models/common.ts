import mongoose, { Schema } from "mongoose";
import { chatsSchema } from "./chats";

export interface IChat {
  id?: any;
  sender_id: string;
  receiver_id: string;

  messageType: string;
  data: string;

  create_timestamp: number;
}

const lastChat = new Schema<IChat>({
  id: Object,
  sender_id: String,
  receiver_id: String,

  messageType: String,
  data: String,

  create_timestamp: Number,
});

export interface User {
  id?: any;
  email: string;
  password?: string;
  createdAt?: number;
  lastSeen?: number;
  // contacts?: Object;
  contacts?: Map<string, IChat>;
  // contacts?: { [key: string]: ChatModel };
  userType?: string;
}

export interface Media {
  filename: string;
  data: string;
}
