import { Request, Response, Router } from "express";

export const settingsRouter = Router();

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
