import { Document, Schema, model } from "mongoose";

export interface IPackage {
  name: string;
  expressLimit: string;
  showLimit: string;
  uploadLimit: string;
  validityPeriod: string;
  price: number;
}

export interface Package extends IPackage, Document {}

const packagesSchema = new Schema<Package>({
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

export const Packages = model<Package>("Packages", packagesSchema);
