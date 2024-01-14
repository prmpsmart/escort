import { Response, Router } from "express";
import { Admin } from "../../models/admin";
import { ChangePasswordRequest } from "../client/settings";

export const settingsRouter = Router();

settingsRouter.patch(
  "/changePassword",
  async (req: ChangePasswordRequest, res: Response) => {
    /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/ChangePasswordRequest" }
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
    #swagger.responses[409] = {
        schema: { $ref: '#/definitions/IncorrectOldPassword' }
    }
    */

    let invalidRequestMessage;

    if (!req.body.oldPassword) {
      invalidRequestMessage = "`oldPassword`: `string` not provided";
    }
    if (!req.body.newPassword) {
      invalidRequestMessage = "`newPassword`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      const admin = req.session?.user as Admin;

      if (req.body.oldPassword === admin.password) {
        admin.password = req.body.newPassword;
        admin
          .save()
          .then((value) => {
            res.status(200).json({ message: "Password updated successfully" });
          })
          .catch((reason) => {
            res.status(500).json({ message: "Internal server error", reason });
          });
      } else {
        res.status(409).json({ message: "Old password is incorrect" });
      }
    }
  }
);
