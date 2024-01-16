import { Request, Response, Router } from "express";
import { Escort, Escorts } from "../models/escorts";
import { cleanEscort, objectId } from "../utils";

export const singleEscortRouter = Router();

interface GetUserProfileRequest extends Request {
  params: {
    id: string;
  };
}

singleEscortRouter.get(
  "/userProfile/:id",
  async (req: GetUserProfileRequest, res: Response) => {
    /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/EscortProfile' }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

    let escort: Escort | null = await Escorts.findById(objectId(req.params.id));
    if (escort) {
      escort = escort as Escort;
      res
        .status(200)
        .json(JSON.stringify({ profile: await cleanEscort(escort) }));
    } else res.status(404).json({ message: "Escort not found" });
  }
);
