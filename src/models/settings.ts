import { Document, Schema, model } from "mongoose";

export interface ISettings {
  username: string;
  email: string;
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

export interface Settings extends Document, ISettings {}

const settingschema = new Schema<Settings>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  ageVerified: {
    type: Boolean,
    default: true,
  },
  adFree: {
    type: Boolean,
    default: true,
  },
  showProfileOnSearchEngine: {
    type: Boolean,
    default: true,
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
    default: true,
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

export const Settings = model<Settings>("Settings", settingschema);
