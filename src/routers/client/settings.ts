import { Request, Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Client } from "../../models/clients";

export const settingsRouter = Router();

interface SettingsResponse {
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

settingsRouter.get("/settings", (req: AuthRequest, res: Response) => {
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
  const client = req.session?.user as Client;

  const json: SettingsResponse = {
    username: client.username,
    email: client.email,
    number: client.number,
    language: client.language,
    ageVerified: client.ageVerified,
    adFree: client.adFree,

    showProfileOnSearchEngine: client.showProfileOnSearchEngine,
    showProfileOnRandomUsers: client.showProfileOnRandomUsers,
    showProfileOnFindMatchPage: client.showProfileOnFindMatchPage,
    confirmFriendRequest: client.confirmFriendRequest,

    showVisitorsNotifications: client.showVisitorsNotifications,
    showGiftsNotifications: client.showGiftsNotifications,
    showLoginNotifications: client.showLoginNotifications,
    showLikesNotifications: client.showLikesNotifications,
    showMessagesNotifications: client.showMessagesNotifications,
  };
  res.status(200).json(json);
});

interface PrivacyRequest extends AuthRequest {
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

  let invalidRequestMessage;

  if (req.body.showProfileOnSearchEngine == undefined) {
    invalidRequestMessage =
      "`showProfileOnSearchEngine`: `string` not provided";
  }
  if (req.body.showProfileOnRandomUsers == undefined) {
    invalidRequestMessage = "`showProfileOnRandomUsers`: `string` not provided";
  }
  if (req.body.showProfileOnFindMatchPage == undefined) {
    invalidRequestMessage =
      "`showProfileOnFindMatchPage`: `string` not provided";
  }
  if (req.body.confirmFriendRequest == undefined) {
    invalidRequestMessage = "`confirmFriendRequest`: `string` not provided";
  }
  if (invalidRequestMessage) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    try {
    } catch (error) {}
  }

  const client = req.session?.user as Client;

  const json = {};
  res.status(200).json(json);
});

interface ProfileRequest extends Request {
  body: {
    username: string;
    email: string;
    number: string;
    language: string;
    ageVerified: boolean;
    adFree: boolean;
  };
}

settingsRouter.post("/profile", (req: ProfileRequest, res: Response) => {
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
