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
    const client = req.session?.user as Client;
    client.showProfileOnSearchEngine = req.body.showProfileOnSearchEngine;
    client.showProfileOnRandomUsers = req.body.showProfileOnRandomUsers;
    client.showProfileOnFindMatchPage = req.body.showProfileOnFindMatchPage;
    client.confirmFriendRequest = req.body.confirmFriendRequest;

    client
      .save()
      .then((value) => {
        res
          .status(200)
          .json({ message: "Privacy options updated successfully" });
      })
      .catch((reason) => {
        res.status(500).json({ message: "Internal server error", reason });
      });
  }
});

interface ProfileRequest extends AuthRequest {
  body: {
    // username: string;
    // email: string;
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

  let invalidRequestMessage;

  if (!req.body.number) {
    invalidRequestMessage = "`number`: `string` not provided";
  }
  if (!req.body.language) {
    invalidRequestMessage = "`language`: `string` not provided";
  }
  if (req.body.ageVerified == undefined) {
    invalidRequestMessage = "`ageVerified`: `string` not provided";
  }
  if (req.body.adFree == undefined) {
    invalidRequestMessage = "`adFree`: `string` not provided";
  }
  if (invalidRequestMessage) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    const client = req.session?.user as Client;
    client.number = req.body.number;
    client.language = req.body.language;
    client.ageVerified = req.body.ageVerified;
    client.adFree = req.body.adFree;

    client
      .save()
      .then((value) => {
        res.status(200).json({ message: "Profile updated successfully" });
      })
      .catch((reason) => {
        res.status(500).json({ message: "Internal server error", reason });
      });
  }
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

interface NotificationSettingsRequest extends AuthRequest {
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

    let invalidRequestMessage;

    if (req.body.showVisitorsNotifications == undefined) {
      invalidRequestMessage =
        "`showVisitorsNotifications`: `string` not provided";
    }
    if (req.body.showGiftsNotifications == undefined) {
      invalidRequestMessage = "`showGiftsNotifications`: `string` not provided";
    }
    if (req.body.showLoginNotifications == undefined) {
      invalidRequestMessage = "`showLoginNotifications`: `string` not provided";
    }
    if (req.body.showLikesNotifications == undefined) {
      invalidRequestMessage = "`showLikesNotifications`: `string` not provided";
    }
    if (req.body.showMessagesNotifications == undefined) {
      invalidRequestMessage =
        "`showMessagesNotifications`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      const client = req.session?.user as Client;
      client.showVisitorsNotifications = req.body.showVisitorsNotifications;
      client.showGiftsNotifications = req.body.showGiftsNotifications;
      client.showLoginNotifications = req.body.showLoginNotifications;
      client.showLikesNotifications = req.body.showLikesNotifications;
      client.showMessagesNotifications = req.body.showMessagesNotifications;

      client
        .save()
        .then((value) => {
          res
            .status(200)
            .json({ message: "Notification options updated successfully" });
        })
        .catch((reason) => {
          res.status(500).json({ message: "Internal server error", reason });
        });
    }
  }
);
