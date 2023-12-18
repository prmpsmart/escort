import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Lazer Escort REST API Documentation",
    description: "Implementation of Swagger with TypeScript",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "",
    },
  ],
  components: {
    schemas: {
      // Requests
      LoginRequest: {
        $username_email: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      ClientSignupRequest: {
        $first_name: "Mirac",
        $last_name: "Tim",
        $username: "prmpsmart",
        $email: "prmpsmart@gmail.com",
        $password: "pass-string",
      },
      EscortSignupRequest: {
        $working_name: "string",
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
        $hair_color: "brown",
        $gender: "male",
      },
      FindEscortsRequest: {
        $name: "Mirac Pete",
        $username: "petmir",
        $looking_for: "Natey",
        $age_start: 18,
        $age_end: 45,
        $distance: "89km",
        $gender: "female",
      },
      AdvertizeRequest: {
        $who_are_you: "string",
        $name: "string",
        $number: "string",
        $email: "string",
        $send_copy: "boolean",
        $website: "string",
        $city: "string",
        $query: "string",
      },
      GetInTouchRequest: {
        $first_name: "string",
        $last_name: "string",
        $email: "string",
        $number: "string",
        $message: "boolean",
      },
      // Responses
      UserProfile: {
        personal_details: {
          gender: "string",
          sexuality: "string",
          age: "number",
          nationality: "string",
        },
        physical_details: {
          chest: "string",
          waist: "string",
          hips: "string",
          ethnicity: "string",
          hair_colour: "string",
          height: "number",
          weight: "number",
          eye_colour: "string",
          genetalia: "string",
          cup_size: "string",
          breast_implant: "string",
          body_type: "string",
          body_art: "string",
        },
        languages: ["string"],
        booking_notes: ["string"],
        location: {
          incall: "string",
          outcall: {
            location: "string",
            i_travel_to: "string",
          },
        },
        price: {
          incall: {
            hour_1: "float",
            hour_2: "float",
            hour_3: "float",
          },
          outcall: {
            hour_1: "float",
            hour_2: "float",
            hour_3: "float",
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
    definitions: {
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
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
