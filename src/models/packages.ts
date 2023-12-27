import { Document, Schema, model } from "mongoose";
// not done
interface Packages extends Document {
  name: string;
  expressLimit: string;
  showLimit: string;
  uploadLimit: string;
  validityPeriod: string;
  price: number;
}

const packagesSchema = new Schema<Packages>({
  name: {
    type: String,
    required: true,
  },
  expressLimit: {
    type: String,
    required: true,
  },
  showLimit: {
    type: String,
    required: true,
  },
  uploadLimit: {
    type: String,
    required: true,
  },
  validityPeriod: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Packages = model<Packages>("Packages", packagesSchema);

export default Packages;
