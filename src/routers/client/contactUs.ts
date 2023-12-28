import { Request, Response, Router } from "express";
import Reports from "../../models/reports";

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

contactUsRouter.post(
  "/contactUs",
  async (req: ContactUsRequest, res: Response) => {
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

    let invalidRequestMessage;

    if (!req.body.firstName) {
      invalidRequestMessage = "`firstName`: `string` not provided";
    }
    if (!req.body.lastName) {
      invalidRequestMessage = "`lastName`: `string` not provided";
    }
    if (!req.body.email) {
      invalidRequestMessage = "`email`: `string` not provided";
    }
    if (!req.body.number) {
      invalidRequestMessage = "`number`: `string` not provided";
    }
    if (!req.body.message) {
      invalidRequestMessage = "`message`: `string` not provided";
    }

    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      await Reports.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        message: req.body.message,
      });
      res.status(200).json({ message: "Report added successfully" });
    }
  }
);
