import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Admins } from "../../models/admin";
import { objectId } from "../../utils";

export const settingsRouter = Router();
interface UserChangePasswordRequest extends AuthRequest {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

settingsRouter.post(
  "/settings",
  async (req: UserChangePasswordRequest, res: Response) => {
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
      const admin = await Admins.findOne({ _id: objectId(req.token) });
      if (admin) {
        if (req.body.oldPassword === admin.password) {
          admin.password = req.body.newPassword;
          admin.save();
        } else {
          res.status(409).json({ message: "Old password is incorrect" });
        }
      } else {
        res.status(404).json({ message: "Admin does not exist, relogin" });
      }
    }
  }
);
