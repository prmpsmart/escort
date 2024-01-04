import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import { Escort, Escorts } from "../models/escorts";
import { clean } from "../utils";

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
    const escorts: Escort[] = await Escorts.find();

    res.status(200).send(clean({ escorts }));
  }
);
