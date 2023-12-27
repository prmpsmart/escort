import { Request, Response, Router } from "express";

export const upgradeProRouter = Router();

interface UpgradeProRequest extends Request {
  body: {
    images: string[];
    height: number;
    hairColor: string;
    country: string;
    gender: string;
    birthday: number;
  };
}

upgradeProRouter.post(
  "/upgradePro",
  (req: UpgradeProRequest, res: Response) => {
    /**
        #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/UpgradeProRequest" }
        }
    
        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/BadRequest' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/UserNotExists' }
        }
         */

    let invalidRequest = false;
    let invalidRequestMessage;

    if (!req.body.images) {
      invalidRequest = true;
      invalidRequestMessage = "`images`: `string` not provided";
    }
    if (!req.body.height) {
      invalidRequest = true;
      invalidRequestMessage = "`height`: `string` not provided";
    }
    if (!req.body.hairColor) {
      invalidRequest = true;
      invalidRequestMessage = "`hairColor`: `string` not provided";
    }
    if (!req.body.country) {
      invalidRequest = true;
      invalidRequestMessage = "`country`: `string` not provided";
    }
    if (!req.body.gender) {
      invalidRequest = true;
      invalidRequestMessage = "`gender`: `string` not provided";
    }
    if (!req.body.birthday) {
      invalidRequest = true;
      invalidRequestMessage = "`birthday`: `string` not provided";
    }
    if (invalidRequest) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      res.status(200).json({});
    }
  }
);
