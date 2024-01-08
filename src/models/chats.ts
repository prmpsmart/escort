import { Document, Schema, model } from "mongoose";

export interface IChat {
  id?: any;
  user_1_id: string;
  user_2_id: string;
  user_1_is_client: boolean;
  user_2_is_client: boolean;

  message: string;
  create_timestamp: number;
}

export interface Chat extends IChat, Document {}

const chatsSchema = new Schema<Chat>({
  user_1_id: {
    type: String,
    required: true,
  },
  user_2_id: {
    type: String,
    required: true,
  },
  user_1_is_client: {
    type: Boolean,
    required: true,
  },
  user_2_is_client: {
    type: Boolean,
    required: true,
  },
  message: {
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
