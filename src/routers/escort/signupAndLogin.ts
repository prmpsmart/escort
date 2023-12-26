import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import Escort from "../../models/escorts";
import { Sessions } from "../../services/sessions";
import { getUser } from "../../utils/usersUtils";
import { LoginRequest } from "../client/loginScreens";

export const signupAndLoginRouter = Router();

interface LoginResponse {
  workingName: string;
  email: string;

  token: string;
  message: string;
}

signupAndLoginRouter.post("/escortLogin", async (req: LoginRequest, res: Response) => {
  /**
     #swagger.requestBody = {
       required: true,
       schema: { $ref: "#/components/schemas/LoginRequest" }
      }
  
    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/EscortLoginResponse" }
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
    const user: Escort | null = await getUser(req.body.usernameEmail);
    if (user) {
      if (user.workingName) {
        if (user.password == req.body.password) {
          const session = Sessions.addSession(user);

          const json: LoginResponse = {
            workingName: user.workingName,
            email: user.email,

            token: session.id,
            message: "Login Successful",
          };

          return res.status(200).json(json);
        } else {
          return res.status(406).json({
            message: "Invalid credentials",
          });
        }
      } else {
        return res.status(406).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  }
});

interface EscortSignupRequest extends Request {
  body: {
    workingName: string;
    email: string;
    password: string;
  };
}

signupAndLoginRouter.post("/signup", async (req: EscortSignupRequest, res: Response) => {
  /**
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/EscortSignupRequest" }
      }
  
      #swagger.responses[200] = {
      schema: { $ref: "#/components/schemas/EscortLoginResponse" }
     }
      #swagger.responses[409] = {
          schema: { $ref: '#/definitions/UserExists' }
      }
       */

  if (
    (await getUser(req.body.workingName)) ||
    (await getUser(req.body.email))
  ) {
    return res.status(409).json({
      message: "User already exists",
    });
  } else {
    try {
      const escort = await Escort.create({
        workingName: req.body.workingName,
        email: req.body.email,
        password: req.body.password,
      });

      const session = Sessions.addSession(escort);
      const json: LoginResponse = {
        workingName: escort.workingName,
        email: escort.email,

        token: session.id,
        message: "Signup Successful",
      };

      return res.status(200).json(json);
    } catch (error) {
      if (error == Error.ValidationError) {
        return res
          .status(500)
          .json({ message: (error as Error.ValidationError).message });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  }
});
