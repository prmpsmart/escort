import { Request, Response, Router } from "express";

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

homeRouter.get("/findMatches", (req: FindMatchesRequest, res: Response) => {
  /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/Users' }
      }
      
      #swagger.responses[400] = {
      schema: { $ref: '#/definitions/BadRequest' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

  let invalidRequest = false;
  let invalidRequestMessage;

  if (!req.body.gender) {
    invalidRequest = true;
    invalidRequestMessage = "`gender`: `string` not provided";
  }
  if (!req.body.interestedGender) {
    invalidRequest = true;
    invalidRequestMessage = "`interestedGender`: `string` not provided";
  }
  if (!req.body.ageStart) {
    invalidRequest = true;
    invalidRequestMessage = "`ageStart`: `string` not provided";
  }
  if (!req.body.ageEnd) {
    invalidRequest = true;
    invalidRequestMessage = "`ageEnd`: `string` not provided";
  }
  if (invalidRequest) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    const json: FindMatchesResponse = {};
    res.status(200).json(json);
  }
});

interface User {
  image: string;
  location: string;
  name: string;
  age: string;
  id: number;
}
interface Users {
  users: [User?];
}

homeRouter.get("/getUsers", (req: FindMatchesRequest, res: Response) => {
  /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/Users' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

  let users: Users = {
    users: [{ image: "", location: "", name: "", age: "", id: 8989778 }],
  };
  res.status(200).json(users);
});
