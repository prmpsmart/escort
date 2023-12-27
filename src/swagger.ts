import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Lazer Escort",
    description: "Lazer Escort REST API Documentation",
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
        language: "string",
        ageVerified: "boolean",
        adFree: "boolean",
      },
      EditProfileRequest: {
        $modelName: "string",
        $country: "string",
        $city: "string",
        $image: "string",
        description: "string",
        $profileType: "string",
        $age: "number",
        $weight: "number",
        $height: "number",
        $availableFor: "string",
        $breastSize: "number",
        $breastType: "string",
        $nationality: "string",
        $travel: "string",
        $languages: ["string"],
        $tatoo: "string",
        $piercing: "string",
        isPornStar: "boolean",
        services: "string",

        meetingWith: "string",
        cellPhones: ["string"],
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
      UserChangePasswordRequest: {
        $oldPassword: "string",
        $newPassword: "string",
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
      PackageRequest: {
        $name: "string",
        $expressLimit: "any",
        $showLimit: "any",
        $uploadLimit: "any",
        $validityPeriod: "any",
        $price: "number",
      },
      ActiveUsersRequest: {
        $usernameEmail: "string",
      },
      SendQueryRequest: {
        $whoAmI: "string",
        $name: "string",
        $number: "number",
        $email: "string",
        $sendEmail: "boolean",
        $website: "string",
        $city: "string",
        $query: "string",
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
      PackagesRequest: {
        name: "string",
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
      AddImageRequest: {
        images: ["string"],
      },
      AddVideoRequest: {
        videos: ["string"],
      },
      // Responses
      ViewGalleryResponse: {
        images: ["string"],
        videos: ["string"],
      },
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
      UsersResponse: {
        $name: "string",
        $id: "string",
        $email: "string",
        $phone: "string",
        $country: "string",
        $joinedAt: "number",
        $balance: "number",
      },
      EscortLoginResponse: {
        workingName: "string",
        email: "string",
        token: "string",
        message: "string",
      },
      DashboardResponse: {
        remainingInterests: "number",
        remainingContactView: "number",
        currentEscort: "number",
        imageUploaded: "number",
        interestRequests: "number",
        currentPackage: {
          tier: "string",
          advertPost: "number",
          contactView: "number",
          imageUpload: "number",
          expiryDate: "number",
        },
      },
      AdminDashboardResponse: {
        totalUsers: "number",
        activeUsers: "number",
        emailUnverfiedUsers: "number",
        mobileUnverfiedUsers: "number",
        totalPayment: "number",
        pendingPayment: "number",
        rejectedPayment: "number",
        paymentCharge: "number",
        purchasedPackage: "number",
        totalInterests: "number",
        ignoredProfiles: "number",
        reports: "number",
      },
      PackagesResponse: {
        packages: [
          {
            name: "string",
            expressLimit: "string",
            showLimit: "string",
            uploadLimit: "string",
            validityPeriod: "string",
            price: "number",
          },
        ],
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
