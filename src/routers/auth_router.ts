import { Request, Response, Router } from "express";
import Client from "../models/clients";
import Escort from "../models/escorts";

export const authRouter = Router();

interface LoginRequest extends Request {
  body: {
    username_email: number;
    password: string;
    escort: boolean;
  };
}

authRouter.post("/login", async (req: LoginRequest, res: Response) => {
  /**
 #swagger.requestBody = {
     required: true,
     schema: { $ref: "#/components/schemas/LoginRequest" }
   }

  #swagger.responses[404] = {
     schema: { $ref: '#/definitions/UserNotFound' }
   }
   */

  const username_email = req.body.username_email;
  const password = req.body.password;

  const user: Client | null =
    (await Client.findOne({
      $or: [{ email: username_email }, { username: username_email }],
    })) ||
    (await Escort.findOne({
      $or: [{ email: username_email }, { username: username_email }],
    }));
  if (user) {
    console.log(user);
  } else {
    console.log(user);
  }

  res.status(200).json({});
});

interface ClientSignupRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  };
}
authRouter.post("/client_signup", (req: ClientSignupRequest, res: Response) => {
  /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/ClientSignupRequest" }
    }

    #swagger.responses[409] = {
        schema: { $ref: '#/definitions/UserExists' }
    }
     */

  res.status(200).json({});
});

interface EscortSignupRequest extends Request {
  body: {
    working_name: string;
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
