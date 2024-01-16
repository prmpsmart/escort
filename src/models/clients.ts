import { Document, Schema, model } from "mongoose";
import { User, chatModelSchema } from "./common";

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
  about: string;
  education: string;

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
  contacts: { type: Map, of: chatModelSchema },
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
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
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

export const Clients = model<Client>("Clients", clientsSchema);
