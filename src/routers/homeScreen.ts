import { Request, Response, Router } from "express";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { cleanEscort } from "../utils";

export const homeRouter = Router();

interface FindMatchesRequest extends Request {
  body: {
    gender: string;
    ageStart: number;
    ageEnd: number;
  };
}

homeRouter.post(
  "/findMatches",
  async (req: FindMatchesRequest, res: Response) => {
    /**
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/EscortsProfilesResponse" }
      }
      #swagger.responses[400] = {
      schema: { $ref: '#/definitions/BadRequest' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

    let invalidRequestMessage;
    const filter: any = {};
    const age: any = {};

    if (req.body.gender) {
      filter["personalDetails.gender"] = req.body.gender;
    }
    if (req.body.ageStart) {
      age["$gte"] = req.body.ageStart;
    }
    if (req.body.ageEnd) {
      age["$lte"] = req.body.ageEnd;
    }
    if (age) {
      filter["personalDetails.age"] = age;
    }

    const escorts = await Escorts.find(filter);
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

// interface User {
//   image: string;
//   location: string;
//   name: string;
//   age: string;
//   id: number;
// }
// interface UsersResponse {
//   users: [User?];
// }

homeRouter.get("/getUsers", async (req: Request, res: Response) => {
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
});
