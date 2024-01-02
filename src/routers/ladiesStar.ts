import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import { Escort, Escorts } from "../models/escorts";
import { cleanItem } from "../utils";

export const ladiesStarRouter = Router();

ladiesStarRouter.get(
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

    // Execute the query
    const _escorts: Escort[] = await Escorts.find();

    const escorts = new Array();

    _escorts.forEach(async (escort: Escort) => {
      if (escort) {
        escorts.push(cleanItem(escort));
      }
    });

    res.status(200).send(JSON.stringify({ escorts }));
  }
);
