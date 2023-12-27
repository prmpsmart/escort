import { Document, Schema, model } from "mongoose";

interface Messages extends Document {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  image: string;
  createdAt: Date;

}

const messagesSchema = new Schema<Messages>({
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
    type: Date,
    default: Date.now,
  },
});

messagesSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
})
const Messages = model<Messages>("Messages", messagesSchema);

export default Messages;
