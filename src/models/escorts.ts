import { Document, Schema, model } from "mongoose";

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

interface Escort extends Document {
  workingName: string;
  email: string;
  password: string;
  createdAt: Date;
  personalDetails: PersonalDetails;
  physicalDetails: PhysicalDetails;
  languages: string[];
  bookingNotes: string[];
  location: Location;
  price: Price;
  availability: Availability;
  services: string[];
}

const escortSchema = new Schema<Escort>({
  workingName: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  personalDetails: {
    type: {
      gender: String,
      sexuality: String,
      age: Number,
      nationality: String,
    },
    required: true,
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
    required: true,
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
        required: true,
      },
    },
    required: true,
  },
  price: {
    type: {
      incall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
        required: true,
      },
      outcall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
        required: true,
      },
    },
    required: true,
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
    required: true,
  },
  services: { type: [String], default: [] },
});

const EscortModel = model<Escort>("Escort", escortSchema);

export default EscortModel;
