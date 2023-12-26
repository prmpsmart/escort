import { Request, Response, Router } from "express";

export const advertRouter = Router();

interface SendQueryRequest extends Request {
  body: {
    whoAmI: string;
    name: string;
    number: number;
    email: string;
    sendEmail: boolean;
    website: string;
    city: string;
    query: string;
  };
}

advertRouter.post("/sendQuery", (req: SendQueryRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/SendQueryRequest" }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json = {};
  res.status(200).json(json);
});

interface BuyAdFreeRequest extends Request {
  body: {
    duration: number;
  };
}

advertRouter.post("/buyAdFree", (req: BuyAdFreeRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/BuyAdFreeRequest" }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json = {};
  res.status(200).json(json);
});
