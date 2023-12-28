import { Document, Schema, model } from "mongoose";
import { User } from "../utils/user";

interface PersonalDetails {
  gender: string;
  sexuality: string;
  age: number;
  nationality: string;
}

interface PhysicalDetails {
  chest: string;
  waist: string;
  hips: string;
  ethnicity: string;
  hairColour: string;
  height: number;
  weight: number;
  eyeColour: string;
  genetalia: string;
  cupSize: string;
  breastImplant: string;
  bodyType: string;
  bodyArt: string;
}

interface Location {
  incall: string;
  outcall: {
    location: string;
    iTravelTo: string;
  };
}

interface Price {
  incall: {
    hour1: number;
    hour2: number;
    hour3: number;
  };
  outcall: {
    hour1: number;
    hour2: number;
    hour3: number;
  };
}

interface Availability {
  monday: boolean;
  tueday: boolean;
  wednesday: boolean;
  thurday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface IEscort extends User {
  workingName: string;
  verifiedPhone: boolean;
  verifiedEmail: boolean;
  personalDetails: PersonalDetails;
  physicalDetails: PhysicalDetails;
  languages: string[];
  bookingNotes: string[];
  location: Location;
  price: Price;
  availability: Availability;
  services: string[];
  images: string[];
  videos: string[];
}

export interface Escort extends IEscort, Document {}

const escortSchema = new Schema<Escort>({
  workingName: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  verifiedPhone: { type: Boolean, default: false },
  verifiedEmail: { type: Boolean, default: false },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  lastSeen: { type: Number, default: Date.now },

  personalDetails: {
    type: {
      gender: String,
      sexuality: String,
      age: Number,
      nationality: String,
    },
  },
  physicalDetails: {
    type: {
      chest: String,
      waist: String,
      hips: String,
      ethnicity: String,
      hairColour: String,
      height: Number,
      weight: Number,
      eyeColour: String,
      genetalia: String,
      cupSize: String,
      breastImplant: String,
      bodyType: String,
      bodyArt: String,
    },
  },
  languages: { type: [String], default: [] },
  bookingNotes: { type: [String], default: [] },
  location: {
    type: {
      incall: String,
      outcall: {
        type: {
          location: String,
          iTravelTo: String,
        },
      },
    },
  },
  price: {
    type: {
      incall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
      },
      outcall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
      },
    },
  },
  availability: {
    type: {
      monday: Boolean,
      tueday: Boolean,
      wednesday: Boolean,
      thurday: Boolean,
      friday: Boolean,
      saturday: Boolean,
      sunday: Boolean,
    },
  },
  services: { type: [String], default: [] },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
});

escortSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }

  next();
});

export const Escorts = model<Escort>("Escorts", escortSchema);
