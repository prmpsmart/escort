import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import Client from "../models/clients";
import Escort from "../models/escorts";
import { Sessions } from "../services/sessions";
import { getUser } from "../utils/usersUtils";

export const authRouter = Router();

// export const Users = {};

interface LoginRequest extends Request {
  body: {
    usernameEmail: string;
    password: string;
    isEscort: boolean;
  };
}

const login = async (req: LoginRequest, res: Response) => {
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
  if (req.body.isEscort == undefined) {
    invalidRequest = true;
    invalidRequestMessage = "`isEscort`: `boolean` not provided";
  }

  if (invalidRequest) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    const user: Client | Escort | null = await getUser(req.body.usernameEmail);
    if (user) {
      if (user.password == req.body.password) {
        const json: { [key: string]: any } = {};

        if (req.body.isEscort) {
          const escort = user as Escort;

          if (escort.workingName) json["workingName"] = escort.workingName;
          else
            return res.status(406).json({
              message: "Invalid credentials",
            });
        } else {
        }

        const session = Sessions.addSession(user);

        json["token"] = session.id;
        json["message"] = "Login Successful";
        json["email"] = user.email;

        return res.status(200).json(json);
      } else {
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  }
};

authRouter.post("/clientLogin", async (req: LoginRequest, res: Response) => {
  /**
   #swagger.requestBody = {
     required: true,
     schema: { $ref: "#/components/schemas/LoginRequest" }
    }

  #swagger.responses[200] = {
    schema:  { $ref: "#/components/schemas/ClientLoginResponse" }
   }
  #swagger.responses[404] = {
    schema: { $ref: '#/definitions/UserNotFound' }
  }
  #swagger.responses[406] = {
    schema: { $ref: '#/definitions/InvalidCredentials' }
  }
  */
  return await login(req, res);
});

authRouter.post("/escortLogin", async (req: LoginRequest, res: Response) => {
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

  return await login(req, res);
});

interface ClientSignupRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };
}

authRouter.post(
  "/clientSignup",
  async (req: ClientSignupRequest, res: Response) => {
    /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/ClientSignupRequest" }
    }

    #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/LoginResponse" }
   }
    #swagger.responses[409] = {
        schema: { $ref: '#/definitions/UserExists' }
    }
     */

    if ((await getUser(req.body.username)) || (await getUser(req.body.email))) {
      return res.status(409).json({
        message: "User already exists",
      });
    } else {
      try {
        const client = await Client.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        const session = Sessions.addSession(client);

        return res.status(200).json({
          token: session.id,
          message: "Signup Successful",
          email: client.email,
          firstName: client.firstName,
          lastName: client.lastName,
          username: client.username,
        });
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
  }
);

interface EscortSignupRequest extends Request {
  body: {
    workingName: string;
    email: string;
    password: string;
  };
}

authRouter.post(
  "/escortSignup",
  async (req: EscortSignupRequest, res: Response) => {
    /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/EscortSignupRequest" }
    }

    #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/LoginResponse" }
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

        return res.status(200).json({
          token: session.id,
          message: "Signup Successful",
          email: escort.email,
          workingName: escort.workingName,
        });
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
  }
);

interface RecoverPasswordRequest extends Request {
  body: {
    email: string;
  };
}

interface ChangePasswordRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
