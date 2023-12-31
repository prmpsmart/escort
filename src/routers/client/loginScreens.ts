import { Request, Response, Router } from "express";
import admin from "firebase-admin";
import { Error } from "mongoose";
import { Clients } from "../../models/clients";
import { ClientSessions } from "../../services/sessions";
import { getUser } from "../../utils";

export const loginRouter = Router();

export interface LoginRequest extends Request {
  body: {
    usernameEmail: string;
    password: string;
  };
}

interface LoginResponse {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  images: string[];

  token: string;
  message: string;
}

interface ClientSignupRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };
}

loginRouter.post(
  "/register",
  async (req: ClientSignupRequest, res: Response) => {
    /**
     #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/ClientSignupRequest" }
    }

    #swagger.responses[200] = {
        schema:  { $ref: "#/components/schemas/ClientLoginResponse" }
    }
    #swagger.responses[400] = {
        schema: { $ref: '#/definitions/BadRequest' }
    }
    swagger.responses[409] = {
        schema: { $ref: '#/definitions/UserExists' }
    }
    */
    let invalidRequestMessage;

    if (!req.body.firstName) {
      invalidRequestMessage = "`firstName`: `string` not provided";
    }
    if (!req.body.lastName) {
      invalidRequestMessage = "`lastName`: `string` not provided";
    }
    if (!req.body.username) {
      invalidRequestMessage = "`username`: `string` not provided";
    }
    if (!req.body.email) {
      invalidRequestMessage = "`email`: `string` not provided";
    }
    if (!req.body.password) {
      invalidRequestMessage = "`password`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      if (
        (await getUser(req.body.username)) ||
        (await getUser(req.body.email))
      ) {
        return res.status(409).json({
          message: "User already exists",
        });
      } else {
        try {
          const client = await Clients.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });

          const session = ClientSessions.addSession(client);
          const storageBucket = admin.storage().bucket();
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);

          const images: string[] = [];
          client.images.forEach(async (image) => {
            const _image = await storageBucket.file(image).getSignedUrl({
              action: "read",
              expires: expirationDate.toISOString(), // Adjust the expiration date as needed
            });
            images.push(_image[0]);
          });

          const json: LoginResponse = {
            email: client.email,
            firstName: client.firstName,
            lastName: client.lastName,
            username: client.username,
            images: client.images,

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
    }
  }
);

interface RecoverPasswordRequest extends Request {
  body: {
    email: string;
  };
}
loginRouter.post(
  "/recoverPassword",
  async (req: RecoverPasswordRequest, res: Response) => {
    /**
    #swagger.requestBody = {
         required: true,
        schema: { $ref: "#/components/schemas/RecoverPasswordRequest" }
    }
  
    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/Response" }
    }
    
    #swagger.responses[400] = {
       schema: { $ref: '#/definitions/BadRequest' }
    }
    #swagger.responses[404] = {
      schema: { $ref: '#/definitions/UserNotFound' }
    }
    */

    let invalidRequestMessage;

    if (!req.body.email) {
      invalidRequestMessage = "`email`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      res.status(200).json({});
    }
  }
);

interface ChangePasswordRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

loginRouter.post(
  "/changePassword",
  async (req: ChangePasswordRequest, res: Response) => {
    /**
     #swagger.requestBody = {
       required: true,
       schema: { $ref: "#/components/schemas/ChangePasswordRequest" }
      }
  
    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/Response" }
     }
    
    #swagger.responses[400] = {
       schema: { $ref: '#/definitions/BadRequest' }
    }
    #swagger.responses[404] = {
      schema: { $ref: '#/definitions/UserNotFound' }
    }
    */

    let invalidRequestMessage;

    if (!req.body.email) {
      invalidRequestMessage = "`email`: `string` not provided";
    }
    if (!req.body.password) {
      invalidRequestMessage = "`password`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      res.status(200).json({});
    }
  }
);

loginRouter.post("/loginWithFacebook", async (req: Request, res: Response) => {
  res.status(200).json({});
});

loginRouter.post("/loginWithDiscord", async (req: Request, res: Response) => {
  res.status(200).json({});
});

loginRouter.post("/loginWithGoogle", async (req: Request, res: Response) => {
  res.status(200).json({});
});
