import { Document, Schema, model } from "mongoose";
import { User } from "../utils";

interface IClient extends User {
  firstName: string;
  lastName: string;
  username: string;
  images: string[];

  height: number;
  hairColor: string;
  country: string;
  gender: string;
  birthday: number;

  number: string;
  language: string;
  ageVerified: boolean;
  adFree: boolean;

  showProfileOnSearchEngine: boolean;
  showProfileOnRandomUsers: boolean;
  showProfileOnFindMatchPage: boolean;
  confirmFriendRequest: boolean;

  showVisitorsNotifications: boolean;
  showGiftsNotifications: boolean;
  showLoginNotifications: boolean;
  showLikesNotifications: boolean;
  showMessagesNotifications: boolean;
}

export interface Client extends Document, IClient {}

const clientsSchema = new Schema<Client>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastSeen: {
    type: Number,
    default: Date.now,
  },
  height: {
    type: Number,
    default: Date.now,
  },
  birthday: {
    type: Number,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  hairColor: {
    type: String,
  },
  country: {
    type: String,
  },
  gender: {
    type: String,
  },
  images: { type: [String], default: [] },
  createdAt: {
    type: Number,
    default: Date.now,
  },

  showProfileOnSearchEngine: {
    type: Boolean,
    default: false,
  },
  showProfileOnRandomUsers: {
    type: Boolean,
    default: true,
  },
  showProfileOnFindMatchPage: {
    type: Boolean,
    default: true,
  },
  confirmFriendRequest: {
    type: Boolean,
    default: false,
  },
  showVisitorsNotifications: {
    type: Boolean,
    default: true,
  },
  showGiftsNotifications: {
    type: Boolean,
    default: true,
  },
  showLoginNotifications: {
    type: Boolean,
    default: true,
  },
  showLikesNotifications: {
    type: Boolean,
    default: true,
  },
  showMessagesNotifications: {
    type: Boolean,
    default: true,
  },
});

clientsSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});

export const Clients = model<Client>("Clients", clientsSchema);
