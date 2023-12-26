import { Request, Response, Router } from "express";

export const userLadyStarRouter = Router();

interface LadieStarsRequest extends Request {
  body: {
    region: string;
  };
}

interface LadieStarsResponse {
  images: Array<string>;
  name: string;
  location: string;
  age: number;
  height: number;
  details: string;
}

userLadyStarRouter.post(
  "/ladiesStars",
  (req: LadieStarsRequest, res: Response) => {
    /**
    #swagger.requestBody = {
       required: true,
       schema: { $ref: "#/components/schemas/LadieStarsRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/LadieStarsResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    const json: LadieStarsResponse = {
      images: [],
      name: "",
      location: "",
      age: 0,
      height: 0,
      details: "",
    };
    res.status(200).json(json);
  }
);
