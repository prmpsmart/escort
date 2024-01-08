import { Request, Response, Router } from "express";
import { Client } from "../models/clients";
import { Escort } from "../models/escorts";
import { Sessions, UserType } from "../services/sessions";
import { cleanObject, getMediaLinks, getUser } from "../utils";
import { LoginRequest } from "./client/loginScreens";
import { createToken, verifyToken } from "../middleware/jwtService";
import { AuthRequest } from "../middleware/checkToken";

export const loginRouter = Router();

// interface EscortR extends IEscort {
//   id: string;
// }

// interface LoginResponse {
//   firstName: string;
//   lastName: string;
//   username: string;
//   workingName: string;
//   email: string;

//   token: string;
//   message: string;
//   profile: EscortR;
// }

loginRouter.post("/login", async (req: LoginRequest, res: Response) => {
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
    let session = Sessions.getSessionByEmail(req.body.usernameEmail);

    let user;

    if (session) {
      user = session.user;
    } else {
      user = await getUser(req.body.usernameEmail);
    }

    if (user) {
      if (user.password == req.body.password) {
        session = Sessions.addSession(
          user,
          user.workingName != undefined ? UserType.Escort : UserType.Client
        );

        let profile;
        const escort = user as Escort;
        const client = user as Client;

        let images = await getMediaLinks(client.images);

        if (escort.workingName) {
          profile = {
            workingName: escort.workingName,
            email: escort.email,
            verifiedPhone: escort.verifiedPhone,
            verifiedEmail: escort.verifiedEmail,
            createdAt: escort.createdAt,
            personalDetails: cleanObject(escort.personalDetails),
            physicalDetails: cleanObject(escort.physicalDetails),
            languages: escort.languages,
            bookingNotes: escort.bookingNotes,
            location: cleanObject(escort.location),
            price: cleanObject(escort.price),
            availability: cleanObject(escort.availability),
            meeting: cleanObject(escort.meeting),
            services: escort.services,
            videos: await getMediaLinks(escort.videos),
          };
        }

        const json = {
          id: user.id,
          firstName: client.firstName,
          lastName: client.lastName,
          username: client.username,

          workingName: escort.workingName,
          email: user.email,
          images,

          token: createToken(session.id),
          message: "Login Successful",
          profile: profile,
        };

        return res.status(200).json(json);
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

// interface LoginResponse {
//   firstName: string;
//   lastName: string;
//   username: string;
//   workingName: string;
//   email: string;

//   token: string;
//   message: string;
//   profile: EscortR;
// }

interface RefreshTokenRequest extends Request {
  body: {
    token: string;
  };
}

loginRouter.post(
  "/refresh_access_token",
  async (req: RefreshTokenRequest, res: Response) => {
    /**
     #swagger.requestBody = {
       required: true,
       schema: { $ref: "#/components/schemas/RefreshToken" }
      }

    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/RefreshToken" }
     }
    #swagger.responses[404] = {
       schema: { $ref: '#/definitions/InvalidRefreshToken' }
     }
     */

    const session_id = verifyToken(req.body.token);
    if (session_id.length > 0) {
      return res.json({ accessToken: createToken(session_id) });
    } else {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
);
