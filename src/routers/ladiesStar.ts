import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { clean, cleanEscort, getMediaLinks } from "../utils";

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

    const escorts: Escort[] = await Escorts.find();

    const jsons: IEscort[] = [];

    escorts.forEach(async (escort) => {
      jsons.push(await cleanEscort(escort));
    });

    res.status(200).send(JSON.stringify({ users: jsons }));
  }
);
