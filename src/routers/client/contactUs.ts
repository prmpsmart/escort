import { Request, Response, Router } from "express";

export const contactUsRouter = Router();

interface ContactUsRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    number: number;
    message: string;
  };
}

contactUsRouter.post("/contactUs", (req: ContactUsRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/ContactUsRequest" }
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
