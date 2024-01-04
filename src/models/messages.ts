import { Document, Schema, model } from "mongoose";

interface IMessage {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  image: string;
  createdAt?: number;
}

interface Message extends IMessage, Document {}

const messagesSchema = new Schema<Message>({
  chat_id: {
    type: String,
    required: true,
  },
  sender_id: {
    type: String,
    required: true,
  },
  receiver_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const Messages = model<Message>("Messages", messagesSchema);

export default Messages;
