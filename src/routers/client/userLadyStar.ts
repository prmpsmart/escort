import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort, Escorts } from "../../models/escorts";
import { cleanItem } from "../../utils/commonUtils";

export const userLadyStarRouter = Router();

interface LadieStarsRequest extends AuthRequest {
  body: {
    region: string;

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
    // preferences: string;

    // withReviews: boolean;
    verified: boolean;
    // newComers: boolean;
    withVideos: boolean;
    // pornStar: boolean;
    // independent: boolean;
    // seenLastWeek: boolean;
    // doWithGirl: boolean;
    // couple: boolean;
  };
}

userLadyStarRouter.get(
  "/ladiesStars",
  async (req: AuthRequest, res: Response) => {
    /**
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

    const query: any = {};

    // Add conditions based on request properties
    if (req.body.region) {
      query["location.incall"] = RegExp(req.body.region, "i");
    }

    if (req.body.workingName) {
      query.workingName = RegExp(req.body.workingName, "i");
    }

    if (req.body.ageStart && req.body.ageEnd) {
      query["personalDetails.age"] = {
        $gte: req.body.ageStart,
        $lte: req.body.ageEnd,
      };
    }

    if (req.body.hair) {
      query["physicalDetails.hairColor"] = RegExp(req.body.hair, "i");
    }
    if (req.body.breast) {
      query["physicalDetails.breastImplant"] = RegExp(req.body.breast, "i");
    }
    if (req.body.weight) {
      query["physicalDetails.weight"] = req.body.weight;
    }
    if (req.body.height) {
      query["physicalDetails.height"] = req.body.height;
    }
    if (req.body.ethnic) {
      query["physicalDetails.ethnicity"] = RegExp(req.body.ethnic, "i");
    }

    // Add condition for languages
    if (req.body.languages && req.body.languages.length > 0) {
      query.languages = { $in: req.body.languages };
    }
    if (req.body.verified) {
      query.verified = req.body.verified;
    }

    if (req.body.withVideos) {
      query["videos.0"] = { $exists: true };
    }

    // Execute the query
    const _escorts: Escort[] = await Escorts.find(query);

    const escorts = new Array();

    _escorts.forEach(async (escort: Escort) => {
      if (escort) {
        escorts.push(cleanItem(escort));
      }
    });

    res.status(200).send(JSON.stringify({ escorts }));
  }
);
