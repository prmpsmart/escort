import { Request, Response, Router } from "express";
export const authRouter = Router();
export const authVerifyRouter = Router();

interface LoginRequest extends Request {
  body: {
    username: number;
    email: string;
  };
}
authRouter.post("/login", (req: LoginRequest, res: Response) => {
  /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/LoginRequest" }
    }

    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotFound' }
    }
     */

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
