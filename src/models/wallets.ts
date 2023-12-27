import { Document, Schema, model } from "mongoose";
// not done
interface Wallets extends Document {
  user_id: string;
  user_1: string;
  user_2: string;
  user_1_is_client: boolean;
  user_2_is_client: boolean;
}

const walletsSchema = new Schema<Wallets>({
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

const Wallets = model<Wallets>("Wallets", walletsSchema);

export default Wallets;
