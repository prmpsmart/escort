import { Request, Response, Router } from "express";
import Client from "../models/clients";
import Escort from "../models/escorts";
import { Sessions } from "../services/sessions";
import { getUser } from "../utils/usersUtils";

export const authRouter = Router();

export const Users = {};

interface LoginRequest extends Request {
  body: {
    usernameEmail: string;
    password: string;
    isEscort: boolean;
  };
}

authRouter.post("/login", async (req: LoginRequest, res: Response) => {
  /**
 #swagger.requestBody = {
     required: true,
     schema: { $ref: "#/components/schemas/LoginRequest" }
    }
    
    #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/LoginResponse" }
   }
  #swagger.responses[404] = {
     schema: { $ref: '#/definitions/UserNotFound' }
   }
  #swagger.responses[406] = {
     schema: { $ref: '#/definitions/InvalidCredentials' }
   }
   */

  const user: Client | Escort | null = await getUser(
    req.body.usernameEmail,
    req.body.isEscort
  );
  if (user) {
    if (user.password == req.body.password) {
      const session = Sessions.addSession(user);

      const json = new Map<string, any>();
      json.set("token", session.id);
      json.set("message", "Login Successful");
      json.set("email", user.email);

      if (req.body.isEscort) {
        const escort = user as Escort;
        json.set("workingName", escort.workingName);
      } else {
        const client = user as Client;
        json.set("firstName", client.firstName);
        json.set("lastName", client.lastName);
        json.set("username", client.username);
      }

      res.status(200).json(json);
    } else {
      res.status(406).json({
        message: "Invalid credentials",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

export interface ClientSignupRequest extends Request {
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

    #swagger.responses[409] = {
        schema: { $ref: '#/definitions/UserExists' }
    }
     */

    const user: Client | null =
      (await getUser(req.body.username, false)) ||
      (await getUser(req.body.email, false));

    if (user) {
      res.status(409).json({
        message: "User already exists",
      });
    } else {
      Client.create({
        firstName: "string",
        lastName: "string",
        username: "string",
        email: "string",
        password: "string",
      });
    }

    res.status(200).json({});
  }
);

interface EscortSignupRequest extends Request {
  body: {
    workingName: string;
    email: string;
    password: string;
  };
}

authRouter.post("/client_signup", (req: EscortSignupRequest, res: Response) => {
  /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/EscortSignupRequest" }
    }

    #swagger.responses[409] = {
        schema: { $ref: '#/definitions/UserExists' }
    }
     */

  res.status(200).json({});
});

interface RecoverPasswordRequest extends Request {
  body: {
    email: string;
  };
}

authRouter.post(
  "/recover_password",
  (req: RecoverPasswordRequest, res: Response) => {
    /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/RecoverPasswordRequest" }
    }

    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
     */

    res.status(200).json({});
  }
);

interface ChangePasswordRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

authRouter.post(
  "/change_password",
  (req: ChangePasswordRequest, res: Response) => {
    /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/ChangePasswordRequest" }
    }

    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
     */
    res.status(200).json({});
  }
);
