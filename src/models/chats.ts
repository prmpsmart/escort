import { Document, Schema, model } from "mongoose";
import { IChat } from "./common";

export interface Chat extends IChat, Document {}

export const chatsSchema = new Schema<Chat>({
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


/**
 *
 *
 *
// Define the child schema for the map
interface MapItem {
  key: string;
  value: string;
}

const MapItemSchema = new Schema<MapItem>({
  key: String,
  value: String,
});

// Define the parent schema with the map as a child
interface Parent extends Document {
  name: string;
  myMap: Map<string, MapItem>;
}
 */