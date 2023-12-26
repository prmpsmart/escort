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
        $usernameEmail: "string",
        $password: "string",
      },
      ClientSignupRequest: {
        $firstName: "Mirac",
        $lastName: "Tim",
        $username: "string",
        $email: "string",
        $password: "string",
      },
      EscortSignupRequest: {
        $workingName: "string",
        $email: "string",
        $password: "string",
      },
      PrivacyRequest: {
        $showProfileOnSearchEngine: "boolean",
        $showProfileOnRandomUsers: "boolean",
        $showProfileOnFindMatchPage: "boolean",
        $confirmFriendRequest: "boolean",
      },
      ProfileRequest: {
        username: "string",
        email: "string",
        number: "string",
        numberlanguage: "string",
        ageVerified: "boolean",
        adFree: "boolean",
      },
      NotificationSettingsRequest: {
        showVisitorsNotifications: "boolean",
        showGiftsNotifications: "boolean",
        showLoginNotifications: "boolean",
        showLikesNotifications: "boolean",
        showMessagesNotifications: "boolean",
      },
      RecoverPasswordRequest: {
        $email: "string",
      },
      ChangePasswordRequest: {
        $email: "string",
        $password: "string",
      },
      ContactUsRequest: {
        firstName: "string",
        lastName: "string",
        email: "string",
        number: "number",
        message: "string",
      },
      UpgradeProRequest: {
        $images: ["base64 encoded image string"],
        $height: 9.8,
        $country: "Germany",
        $birthday: "26/07/1999",
        $hairColor: "brown",
        $gender: "male",
      },
      SendQueryRequest: {
        whoAmI: "string",
        name: "string",
        number: "number",
        email: "string",
        sendEmail: "boolean",
        website: "string",
        city: "string",
        query: "string",
      },
      BuyAdFreeRequest: {
        $duration: "number",
      },
      FindMatchesRequest: {
        gender: "string",
        interestedGender: "string",
        ageStart: "number",
        ageEnd: "number",
      },
      FindEscortsRequest: {
        $name: "string",
        $username: "string",
        $lookingFor: "string",
        $ageStart: "number",
        $ageEnd: "number",
        $distance: "number",

        age: "number",
        hair: "string",
        rates: "number",
        breast: "string",
        travel: "string",
        weight: "number",
        height: "number",
        services: "string",
        ethnic: "string",
        languages: "string",
        preferences: "string",

        withReviews: "boolean",
        verfied: "boolean",
        newComers: "boolean",
        withVideos: "boolean",
        pornStar: "boolean",
        independent: "boolean",
        seenLastWeek: "boolean",
        doWithGirl: "boolean",
        couple: "boolean",
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
      SettingsResponse: {
        username: "string",
        email: "string",
        number: "string",
        numberlanguage: "string",
        ageVerified: "boolean",
        adFree: "boolean",

        showProfileOnSearchEngine: "boolean",
        showProfileOnRandomUsers: "boolean",
        showProfileOnFindMatchPage: "boolean",
        confirmFriendRequest: "boolean",

        showVisitorsNotifications: "boolean",
        showGiftsNotifications: "boolean",
        showLoginNotifications: "boolean",
        showLikesNotifications: "boolean",
        showMessagesNotifications: "boolean",
      },
      Response: {
        message: "string",
      },
      Users: [
        {
          image: "string",
          location: "string",
          name: "string",
          age: "string",
          id: "number",
        },
      ],
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
      FindMatchesResponse: {
        matches: [
          {
            id: "string",
            name: "string",
            image: "string",
            location: "string",

            withReviews: "boolean",
            verfied: "boolean",
            newComers: "boolean",
            withVideos: "boolean",
            pornStar: "boolean",
            independent: "boolean",
            seenLastWeek: "boolean",
            doWithGirl: "boolean",
            couple: "boolean",
          },
        ],
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
            hour1: "number",
            hour2: "number",
            hour3: "number",
          },
          outcall: {
            hour1: "number",
            hour2: "number",
            hour3: "number",
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
        services: [
          "69",
          "blowjob",
          "couples services",
          "dildo play",
          "erotic massage",
          "golden shower",
          "hardcore domina",
          "striptease",
          "threesome",
        ],
      },
    },
  },
  definitions: {
    InvalidSession: {
      message: "Invalid Session : Login again",
    },
    BadRequest: {
      message: "Bad request : Wrong format of payloads.",
    },
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
