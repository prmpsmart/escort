import { Request, Response, Router } from "express";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { cleanEscort, getMediaLink } from "../utils";
import { AuthRequest } from "../middleware/checkToken";

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

interface SearchRequest extends AuthRequest {
  params: {
    searchName: string;
  };
}

interface UserSearch {
  id: string;
  location: string;
  age: number;
  image: string;
  name: string;
}

homeRouter.get(
  "/escorts/:searchName",
  async (req: SearchRequest, res: Response) => {
    /**
  #swagger.responses[200] = {
    schema:  { $ref: "#/components/schemas/UserSearch" }
   }
  #swagger.responses[404] = {
     schema: { $ref: '#/definitions/UserNotFound' }
   }
  #swagger.responses[406] = {
     schema: { $ref: '#/definitions/InvalidCredentials' }
   }
  */

    // const escorts: Escort[] = await Escorts.find({
    //   workingName: req.params.searchName,
    //   modelName: req.params.searchName,
    // });
    const escorts: Escort[] = await Escorts.find({
      $or: [
        { workingName: { $regex: req.params.searchName, $options: "i" } },
        { modelName: { $regex: req.params.searchName, $options: "i" } },
      ],
    });

    const jsons: UserSearch[] = [];

    for (const key in escorts) {
      if (Object.prototype.hasOwnProperty.call(escorts, key)) {
        const element: Escort = escorts[key];
        // const cleaned = await cleanEscort(element);
        jsons.push({
          id: element.id,
          location: element.location.incall,
          age: element.personalDetails.age,
          name: element.workingName,
          image: await getMediaLink(element.personalDetails.image),
        });
      }
    }

    res.status(200).json({ users: jsons });
  }
);
