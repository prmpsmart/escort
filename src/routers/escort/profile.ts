import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { cleanItem } from "../../utils";

export const profileRouter = Router();

interface EditProfileRequest extends AuthRequest {
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
    languages: string[];
    tatoo: string;
    piercing: string;
    isPornStar: boolean;
    services: string;

    meetingWith: string;
    cellPhones: string[];
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

profileRouter.get("/profile", (req: AuthRequest, res: Response) => {
  /**
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
      */

  res
    .status(200)
    .send(JSON.stringify({ profile: cleanItem(req.session?.user) }));
});
