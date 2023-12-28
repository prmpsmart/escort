import { Response, Router } from "express";
import { Admin, Admins } from "../../models/admin";
import { AdminSessions } from "../../services/sessions";
import { User } from "../../utils/user";
import { LoginRequest } from "../client/loginScreens";

export const loginRouter = Router();

interface LoginResponse extends User {
  username: string;

  token: string;
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

  let invalidRequest = false;
  let invalidRequestMessage;

  if (!req.body.usernameEmail) {
    invalidRequest = true;
    invalidRequestMessage = "`usernameEmail`: `string` not provided";
  }
  if (!req.body.password) {
    invalidRequest = true;
    invalidRequestMessage = "`password`: `string` not provided";
  }
  if (invalidRequest) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    const admin: Admin | null = await Admins.findOne({
      $or: [
        { email: req.body.usernameEmail },
        { username: req.body.usernameEmail },
      ],
    });
    if (admin) {
      const session = AdminSessions.addSession(admin);
      if (admin.password == req.body.password) {
        const json: LoginResponse = {
          id: admin.id,
          username: admin.username,
          email: admin.email,

          token: session.id,
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
  }
});
