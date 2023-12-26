import { Request, Response, Router } from "express";

export const dashboardRouter = Router();

interface FindEscortsRequest extends Request {
  body: {
    name: string;
    username: string;
    lookingFor: number;
    ageStart: number;
    ageEnd: number;
    distance: number;

    age: number;
    hair: string;
    rates: number;
    breast: string;
    travel: string;
    weight: number;
    height: number;
    services: string;
    ethnic: string;
    languages: string;
    preferences: string;

    withReviews: boolean;
    verfied: boolean;
    newComers: boolean;
    withVideos: boolean;
    pornStar: boolean;
    independent: boolean;
    seenLastWeek: boolean;
    doWithGirl: boolean;
    couple: boolean;
  };
}

interface Match {
  withReviews: boolean;
  verfied: boolean;
  newComers: boolean;
  withVideos: boolean;
  pornStar: boolean;
  independent: boolean;
  seenLastWeek: boolean;
  doWithGirl: boolean;
  couple: boolean;
}

interface FindMatchesResponse {
  matches: Array<Match>;
}

dashboardRouter.get(
  "/findMatches",
  (req: FindEscortsRequest, res: Response) => {
    /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/FindEscortsRequest' }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

    const json: FindMatchesResponse = {
      matches: [
        {
          withReviews: true,
          verfied: true,
          newComers: true,
          withVideos: true,
          pornStar: true,
          independent: true,
          seenLastWeek: true,
          doWithGirl: true,
          couple: true,
        },
      ],
    };
    res.status(200).json(json);
  }
);
