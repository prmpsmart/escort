import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Lazer Escort REST API Documentation",
    description: "Implementation of Swagger with TypeScript",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "",
    },
  ],
  components: {
    schemas: {
      // Requests
      LoginRequest: {
        $usernameEmail: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      ClientSignupRequest: {
        $firstName: "Mirac",
        $lastName: "Tim",
        $username: "prmpsmart",
        $email: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      EscortSignupRequest: {
        $workingName: "string",
        $email: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      RecoverPasswordRequest: {
        $email: "prmpsmart@gmail.com",
      },
      ChangePasswordRequest: {
        $email: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      UpgradeProRequest: {
        $images: ["base64 encoded image string"],
        $height: 9.8,
        $country: "Germany",
        $birthday: "26/07/1999",
        $hairColor: "brown",
        $gender: "male",
      },
      FindEscortsRequest: {
        $name: "Mirac Pete",
        $username: "petmir",
        $lookingFor: "Natey",
        $ageStart: 18,
        $ageEnd: 45,
        $distance: "89km",
        $gender: "female",
      },
      AdvertizeRequest: {
        $whoAreYou: "string",
        $name: "string",
        $number: "string",
        $email: "string",
        $sendCopy: "boolean",
        $website: "string",
        $city: "string",
        $query: "string",
      },
      GetInTouchRequest: {
        $firstName: "string",
        $lastName: "string",
        $email: "string",
        $number: "string",
        $message: "boolean",
      },
      // Responses
      ClientLoginResponse: {
        firstName: "string",
        lastName: "string",
        email: "string",
        token: "string",
        message: "string",
      },
      EscortLoginResponse: {
        workingName: "string",
        email: "string",
        token: "string",
        message: "string",
      },
      UserProfile: {
        personalDetails: {
          gender: "string",
          sexuality: "string",
          age: "number",
          nationality: "string",
        },
        physicalDetails: {
          chest: "string",
          waist: "string",
          hips: "string",
          ethnicity: "string",
          hairColour: "string",
          height: "number",
          weight: "number",
          eyeColour: "string",
          genetalia: "string",
          cupSize: "string",
          breastImplant: "string",
          bodyType: "string",
          bodyArt: "string",
        },
        languages: ["string"],
        bookingNotes: ["string"],
        location: {
          incall: "string",
          outcall: {
            location: "string",
            iTravelTo: "string",
          },
        },
        price: {
          incall: {
            hour1: "float",
            hour2: "float",
            hour3: "float",
          },
          outcall: {
            hour1: "float",
            hour2: "float",
            hour3: "float",
          },
        },
        availability: {
          monday: "boolean",
          tueday: "boolean",
          wednesday: "boolean",
          thurday: "boolean",
          friday: "boolean",
          saturday: "boolean",
          dunurday: "boolean",
        },
      },
    },
  },
  definitions: {
    InvalidCredentials: {
      message: "Invalid credentials",
    },
    UserNotFound: {
      message: "User not found",
    },
    UserExists: {
      message: "User already exists",
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
};

const outputFile = "./swaggerOutput.json";
const endpointsFiles = ["./src/routers/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
