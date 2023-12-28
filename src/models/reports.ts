import { Document, Schema, model } from "mongoose";

interface IReport {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt?: number;
}

interface Report extends IReport, Document {}

const messagesSchema = new Schema<Report>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

messagesSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});
const Reports = model<Report>("Reports", messagesSchema);

export default Reports;
