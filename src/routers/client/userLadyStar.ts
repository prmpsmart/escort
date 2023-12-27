import { Request, Response, Router } from "express";
import { DEscort, Escorts } from "../../models/escorts";

export const userLadyStarRouter = Router();

interface LadieStarsRequest extends Request {
  body: {
    region: string;

    name: string;
    workingName: string;
    // lookingFor: number;
    ageStart: number;
    ageEnd: number;
    // distance: number;

    age: number;
    hair: string;
    // rates: number;
    breast: string;
    // travel: string;
    weight: number;
    height: number;
    services: string;
    ethnic: string;
    languages: string[];
    preferences: string;

    // withReviews: boolean;
    verfied: boolean;
    // newComers: boolean;
    withVideos: boolean;
    // pornStar: boolean;
    // independent: boolean;
    // seenLastWeek: boolean;
    // doWithGirl: boolean;
    // couple: boolean;
  };
}

userLadyStarRouter.post(
  "/ladiesStars",
  async (req: LadieStarsRequest, res: Response) => {
    /**
    #swagger.requestBody = {
       required: true,
       schema: { $ref: "#/components/schemas/LadieStarsRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/EscortsProfilesResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    const substringToSearch = "ac";
    const chestCondition = "big";
    const extraSubstring = "extra";

    const _escorts = await Escorts.find({
      $or: [
        {
          "physicalDetails.breastImplant": {
            $regex: substringToSearch,
            $options: "i",
          },
        },
        {
          "physicalDetails.chest": { $regex: chestCondition, $options: "i" },
        },
        {
          "physicalDetails.chest": { $regex: extraSubstring, $options: "i" },
        },
      ],
    });

    // const escorts = await Escorts.find({ $or: [] });

    const escorts = new Array();

    _escorts.forEach(async (escort: DEscort) => {
      if (escort) {
        escorts.push(escort);
      }
    });

    res.status(200).send(JSON.stringify({ escorts }));
  }
);
