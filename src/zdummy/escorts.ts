import { Escorts, IEscort } from "../models/escorts";

// Function to generate a random escort object
const generateRandomEscort = (): IEscort => {
  return {
    workingName: `Escort_${Math.floor(Math.random() * 1000)}`,
    email: `escort_${Math.floor(Math.random() * 1000)}@example.com`,
    verfied: true, // 50% chance of being verified
    password: "randomPassword",
    createdAt: Date.now(),
    personalDetails: {
      gender: "Male",
      sexuality: "Heterosexual",
      age: Math.floor(Math.random() * 10) + 20, // Random age between 20 and 30
      nationality: "Random Nationality",
    },
    physicalDetails: {
      chest: "36B",
      waist: "28",
      hips: "38",
      ethnicity: "Random Ethnicity",
      hairColour: "Blonde",
      height: 170,
      weight: 60,
      eyeColour: "Blue",
      genetalia: "Male",
      cupSize: "B",
      breastImplant: "No",
      bodyType: "Athletic",
      bodyArt: "Tattoo",
    },
    languages: ["English", "Spanish"],
    bookingNotes: ["Note 1", "Note 2"],
    location: {
      incall: "Incall Location",
      outcall: {
        location: "Outcall Location",
        iTravelTo: "Travel Location",
      },
    },
    price: {
      incall: {
        hour1: 100,
        hour2: 150,
        hour3: 200,
      },
      outcall: {
        hour1: 150,
        hour2: 200,
        hour3: 250,
      },
    },
    availability: {
      monday: true,
      tueday: true,
      wednesday: true,
      thurday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    services: ["Service 1", "Service 2"],
    images: ["Service 1", "Service 2"],
    videos: ["Service 1", "Service 2"],
  };
};

// Function to add escorts to the database
export const addEscortsToDatabase = async (numberOfEscorts: number) => {
  try {
    for (let i = 0; i < numberOfEscorts; i++) {
      const randomEscort = generateRandomEscort();
      await Escorts.create(randomEscort);
      console.log(`Escort ${i + 1} added to the database`);
    }
    console.log("All escorts added successfully");
  } catch (error) {
    console.error("Error adding escorts to the database:", error);
  }
};
