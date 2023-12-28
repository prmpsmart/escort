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
    verified: boolean;
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
  id: string;
  name: string;
  image: string;
  location: string;

  withReviews: boolean;
  verified: boolean;
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

dashboardRouter.post(
  "/findMatches",
  (req: FindEscortsRequest, res: Response) => {
    /**
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/FindEscortsRequest" }
      }
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/FindMatchesResponse' }
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
          id: "string",
          name: "string",
          image: "string",
          location: "string",

          withReviews: true,
          verified: true,
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
