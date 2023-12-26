import { Request, Response, Router } from "express";

export const singleEscortRouter = Router();

interface UserProfile {
  personalDetails?: {
    gender: string;
    sexuality: string;
    age: number;
    nationality: string;
  };
  physicalDetails?: {
    chest: string;
    waist: string;
    hips: string;
    ethnicity: string;
    hairColour: string;
    height: number;
    weight: number;
    eyeColour: string;
    genetalia: string;
    cupSize: string;
    breastImplant: string;
    bodyType: string;
    bodyArt: string;
  };
  languages?: ["string"];
  bookingNotes?: ["string"];
  location?: {
    incall: string;
    outcall: {
      location: string;
      iTravelTo: string;
    };
  };
  price?: {
    incall: {
      hour1: number;
      hour2: number;
      hour3: number;
    };
    outcall: {
      hour1: number;
      hour2: number;
      hour3: number;
    };
  };
  availability?: {
    monday: boolean;
    tueday: boolean;
    wednesday: boolean;
    thurday: boolean;
    friday: boolean;
    saturday: boolean;
    dunurday: boolean;
  };
  services?: Array<string>;
}

interface GetUserProfileRequest extends Request {
  params: {
    id: string;
  };
}

singleEscortRouter.get(
  "/userProfile/:id",
  (req: GetUserProfileRequest, res: Response) => {
    /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/UserProfile' }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

    const json: UserProfile = {};
    res.status(200).json(json);
  }
);
