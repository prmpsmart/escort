import { Document, Schema, model } from "mongoose";

interface BlackLists extends Document {
  user_id: string;
  list: string[];
}

const blackListsSchema = new Schema<BlackLists>({
  user_id: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

const BlackLists = model<BlackLists>("BlackLists", blackListsSchema);

export default BlackLists;
