import { Document, Schema, model } from "mongoose";
// not done
interface Chats extends Document {
  user_id: string;
  user_1: string;
  user_2: string;
  user_1_is_client: boolean;
  user_2_is_client: boolean;
}

const chatsSchema = new Schema<Chats>({
  user_id: {
    type: String,
    required: true,
  },
  user_1: {
    type: String,
    required: true,
  },
  user_2: {
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
});

const Chats = model<Chats>("Chats", chatsSchema);

export default Chats;
