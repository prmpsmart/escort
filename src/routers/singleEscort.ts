import { Request, Response, Router } from "express";
import { Escorts } from "../models/escorts";
import { clean, objectId } from "../utils";

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

    const escort = await Escorts.findOne({ _id: objectId(req.params.id) });
    if (escort) {
      res.status(200).send({ escort: clean(escort) });
    } else res.status(404).json({ message: "Escort not found" });
  }
);
