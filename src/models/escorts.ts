import { Document, Schema, model } from "mongoose";

interface Escort extends Document {
  workingName: string;
  email: string;
  password: string;
  createdAt: Date;

  getFullName(): string;
}

const clientSchema = new Schema<Escort>({
  workingName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

clientSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

clientSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});

const Escort = model<Escort>("Escort", clientSchema);

export default Escort;
