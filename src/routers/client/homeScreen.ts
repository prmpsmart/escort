import { Request, Response, Router } from "express";
import { Escort, Escorts, IEscort } from "../../models/escorts";
import { cleanEscort } from "../../utils";

export const homeRouter = Router();

interface FindMatchesRequest extends Request {
  body: {
    gender: string;
    interestedGender: string;
    ageStart: number;
    ageEnd: number;
  };
}

interface FindMatchesResponse {}

homeRouter.post("/findMatches", (req: FindMatchesRequest, res: Response) => {
  /**
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/FindMatchesRequest" }
      }
      #swagger.responses[400] = {
      schema: { $ref: '#/definitions/BadRequest' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

  let invalidRequestMessage;

  if (!req.body.gender) {
    invalidRequestMessage = "`gender`: `string` not provided";
  }
  if (!req.body.interestedGender) {
    invalidRequestMessage = "`interestedGender`: `string` not provided";
  }
  if (!req.body.ageStart) {
    invalidRequestMessage = "`ageStart`: `string` not provided";
  }
  if (!req.body.ageEnd) {
    invalidRequestMessage = "`ageEnd`: `string` not provided";
  }
  if (invalidRequestMessage) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    const json: FindMatchesResponse = {};
    res.status(200).json(json);
  }
});

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

  escorts.forEach(async (escort) => {
    jsons.push(await cleanEscort(escort));
  });

  res.status(200).send(JSON.stringify({ users: jsons }));
});
