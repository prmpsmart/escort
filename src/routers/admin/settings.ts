import { Request, Response, Router } from "express";

export const settingsRouter = Router();
interface UserChangePasswordRequest extends Request {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

settingsRouter.post(
  "/packages",
  (req: UserChangePasswordRequest, res: Response) => {
    /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/UserChangePasswordRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/Response' }
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
  }
);
