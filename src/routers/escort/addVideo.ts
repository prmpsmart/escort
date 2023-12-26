import { Request, Response, Router } from "express";

export const addVideoRouter = Router();

interface AddVideoRequest extends Request {
  body: { videos: Array<string> };
}

addVideoRouter.get("/addVideo", (req: AddVideoRequest, res: Response) => {
  /**
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/AddVideoRequest' }
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
