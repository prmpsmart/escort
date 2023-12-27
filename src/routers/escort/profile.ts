import { Request, Response, Router } from "express";

export const profileRouter = Router();

interface EditProfileRequest extends Request {
  body: {
    modelName: string;
    country: string;
    city: string;
    image: string;
    description: string;
    profileType: string;
    age: number;
    weight: number;
    height: number;
    availableFor: string;
    breastSize: number;
    breastType: string;
    nationality: string;
    travel: string;
    languages: Array<string>;
    tatoo: string;
    piercing: string;
    isPornStar: boolean;
    services: string;

    meetingWith: string;
    cellPhones: Array<string>;
  };
}

profileRouter.post("/profile", (req: EditProfileRequest, res: Response) => {
  /**
      #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/EditProfileRequest" }
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

profileRouter.get("/profile", (req: Request, res: Response) => {
  /**
      #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/EditProfileRequest" }
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