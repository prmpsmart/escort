import { Document, Schema, model } from "mongoose";

interface IQuery {
  whoAmI: string;
  name: string;
  phoneNumber: string;
  email: string;
  sendEmail: boolean;
  website: string;
  city: string;
  query: string;
  createdAt?: number;
}

interface Query extends IQuery, Document {}

const messagesSchema = new Schema<Query>({
  whoAmI: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sendEmail: {
    type: Boolean,
    default: false,
  },
  website: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const Queries = model<Query>("Queries", messagesSchema);

export default Queries;
