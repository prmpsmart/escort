import { Document, Schema, model } from "mongoose";

export interface IChat {
  id?: any;
  sender_id: string;
  receiver_id: string;

  messageType: string;
  data: string;

  create_timestamp: number;
}

export interface Chat extends IChat, Document {}

const chatsSchema = new Schema<Chat>({
  sender_id: {
    type: String,
    required: true,
  },
  receiver_id: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    default: "text",
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  create_timestamp: {
    type: Number,
    default: Date.now,
  },
});

const Chats = model<Chat>("Chats", chatsSchema);

export default Chats;
