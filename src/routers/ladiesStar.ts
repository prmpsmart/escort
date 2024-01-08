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
    console.log("Here");
    const escorts: Escort[] = await Escorts.find();
    console.log("Here2");

    const jsons: IEscort[] = [];

    escorts.forEach(async (escort) => {
      jsons.push(await cleanEscort(escort));
    });

    res.status(200).send({ users: jsons });
  }
);
