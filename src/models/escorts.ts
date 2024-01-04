import { Document, Schema, model } from "mongoose";
import { User } from "../utils";

interface PersonalDetails {
  gender: string;
  sexuality: string;
  age: number;
  nationality: string;
  country: string;
  modelName: string;
  image: string;
  description: string;
  availableFor: string;
  isPornStar: boolean;
}

const defaultPersonalDetails: PersonalDetails = {
  gender: "",
  sexuality: "",
  age: 0,
  nationality: "",
  country: "",
  modelName: "",
  image: "",
  description: "",
  availableFor: "",
  isPornStar: false,
};

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
  breastSize: number;
  breastType: string;
  bodyType: string;
  bodyArt: string;
  piercing: string;
}

const defaultPhysicalDetails: PhysicalDetails = {
  chest: "",
  waist: "",
  hips: "",
  ethnicity: "",
  hairColour: "",
  height: 0,
  weight: 0,
  eyeColour: "",
  genetalia: "",
  cupSize: "",
  breastImplant: "",
  breastSize: 0,
  breastType: "",
  bodyType: "",
  bodyArt: "",
  piercing: "",
};

interface Location {
  incall: string;
  outcall: {
    location: string;
    iTravelTo: string;
  };
}

const defaultLocation: Location = {
  incall: "",
  outcall: {
    location: "",
    iTravelTo: "",
  },
};
interface CallPrice {
  hour1: number;
  hour2: number;
  hour3: number;
}
const defaultCallPrice: CallPrice = {
  hour1: 0,
  hour2: 0,
  hour3: 0,
};
interface Price {
  incall: CallPrice;
  outcall: CallPrice;
}

const defaultPrice: Price = {
  incall: defaultCallPrice,
  outcall: defaultCallPrice,
};

interface Availability {
  monday: boolean;
  tueday: boolean;
  wednesday: boolean;
  thurday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

const defaultAvailability: Availability = {
  monday: false,
  tueday: false,
  wednesday: false,
  thurday: false,
  friday: false,
  saturday: false,
  sunday: false,
};
interface Meeting {
  person: string;
  cellphones: string[];
}

const defaultMeeting: Meeting = {
  person: "",
  cellphones: [],
};

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
  meeting: Meeting;
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
      country: String,
      modelName: String,
      image: String,
      description: String,
      availableFor: String,
      isPornStar: Boolean,
    },
    default: defaultPersonalDetails,
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
      breastSize: Number,
      breastType: String,
      bodyType: String,
      bodyArt: String,
      piercing: String,
    },
    default: defaultPhysicalDetails,
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
    default: defaultLocation,
  },
  price: {
    type: {
      incall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
        // default: defaultCallPrice,
      },
      outcall: {
        type: {
          hour1: Number,
          hour2: Number,
          hour3: Number,
        },
        // default: defaultCallPrice,
      },
    },
    dafault: defaultPrice,
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
    dafault: defaultAvailability,
  },
  meeting: {
    type: {
      person: String,
      cellphones: [String],
    },
    default: defaultMeeting,
  },
  services: { type: [String], default: [] },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
});


export const Escorts = model<Escort>("Escorts", escortSchema);
