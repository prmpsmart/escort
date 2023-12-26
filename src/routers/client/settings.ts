import { Request, Response, Router } from "express";

export const settingsRouter = Router();

interface SettingsResponse {
  username: string;
  email: string;
  number: string;
  numberlanguage: string;
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

settingsRouter.get("/settings", (req: Request, res: Response) => {
  /**
    #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/SettingsResponse" }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json: SettingsResponse = {
    username: "",
    email: "",
    number: "",
    numberlanguage: "",
    ageVerified: true,
    adFree: true,

    showProfileOnSearchEngine: true,
    showProfileOnRandomUsers: true,
    showProfileOnFindMatchPage: true,
    confirmFriendRequest: true,

    showVisitorsNotifications: true,
    showGiftsNotifications: true,
    showLoginNotifications: true,
    showLikesNotifications: true,
    showMessagesNotifications: true,
  };
  res.status(200).json(json);
});

interface PrivacyRequest extends Request {
  body: {
    showProfileOnSearchEngine: boolean;
    showProfileOnRandomUsers: boolean;
    showProfileOnFindMatchPage: boolean;
    confirmFriendRequest: boolean;
  };
}

settingsRouter.post("/privacy", (req: PrivacyRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/PrivacyRequest" }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json = {};
  res.status(200).json(json);
});

interface ProfileRequest extends Request {
  body: {
    username: string;
    email: string;
    number: string;
    numberlanguage: string;
    ageVerified: boolean;
    adFree: boolean;
  };
}

settingsRouter.post("/privacy", (req: ProfileRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/ProfileRequest" }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json = {};
  res.status(200).json(json);
});

settingsRouter.get("/deleteAccount", (req: Request, res: Response) => {
  /**
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json = {};
  res.status(200).json(json);
});

interface NotificationSettingsRequest extends Request {
  body: {
    showVisitorsNotifications: boolean;
    showGiftsNotifications: boolean;
    showLoginNotifications: boolean;
    showLikesNotifications: boolean;
    showMessagesNotifications: boolean;
  };
}

settingsRouter.post(
  "/notification",
  (req: NotificationSettingsRequest, res: Response) => {
    /**
      #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/NotificationSettingsRequest" }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
      */

    const json = {};
    res.status(200).json(json);
  }
);
