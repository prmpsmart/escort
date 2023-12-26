import { Request, Response, Router } from "express";

export const paymentRouter = Router();

paymentRouter.get("/payment", (req: Request, res: Response) => {
  /**
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
