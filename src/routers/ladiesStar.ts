import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { cleanEscort } from "../utils";

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

    for (const key in escorts) {
      if (Object.prototype.hasOwnProperty.call(escorts, key)) {
        const element = escorts[key];
        const cleaned = await cleanEscort(element);
        jsons.push(cleaned);
      }
    }

    res.status(200).json({ users: jsons });
  }
);
