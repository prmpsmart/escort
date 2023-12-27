import { Document, Schema, model } from "mongoose";

interface BlackList extends Document {
  user_id: string;
  list: Array<string>;
}

const blackListsSchema = new Schema<BlackList>({
  user_id: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

const BlackList = model<BlackList>("BlackList", blackListsSchema);

export default BlackList;
