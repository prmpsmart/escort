import { Response, Router } from "express";
import { Admins } from "../../models/admin";
import { Sessions, UserType } from "../../services/sessions";
import { User, dbError } from "../../utils";
import { LoginRequest } from "../client/loginScreens";
import { createToken, refreshToken } from "../../middleware/jwtService";

export const loginRouter = Router();

interface LoginResponse extends User {
  username: string;

  token: string;
  refreshToken: string;
  message: string;
}

loginRouter.post("/login", async (req: LoginRequest, res: Response) => {
  /**
       #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/components/schemas/LoginRequest" }
        }

      #swagger.responses[200] = {
        schema:  { $ref: "#/components/schemas/AdminLoginResponse" }
       }
      #swagger.responses[404] = {
         schema: { $ref: '#/definitions/UserNotFound' }
       }
      #swagger.responses[406] = {
         schema: { $ref: '#/definitions/InvalidCredentials' }
       }
       */

  let invalidRequestMessage;

  if (!req.body.usernameEmail) {
    invalidRequestMessage = "`usernameEmail`: `string` not provided";
  }
  if (!req.body.password) {
    invalidRequestMessage = "`password`: `string` not provided";
  }
  if (invalidRequestMessage) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    Admins.findOne({
      $or: [
        { email: req.body.usernameEmail },
        { username: req.body.usernameEmail },
      ],
    }).then((admin) => {
      if (admin) {
        const session = Sessions.addSession(admin, UserType.Admin);
        if (admin.password == req.body.password) {
          const json: LoginResponse = {
            id: admin.id,
            username: admin.username,
            email: admin.email,

            token: createToken(session.id),
            refreshToken: refreshToken(session.id),
            message: "Login Successful",
            createdAt: admin.createdAt,
          };

          return res.status(200).json(json);
        } else {
          return res.status(406).json({
            message: "Invalid credentials",
          });
        }
      } else {
      }
    }, dbError(res));
  }
});
