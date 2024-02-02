import { Request, Response, Router } from "express";
import { Client, Clients } from "../models/clients";
import { Escort, Escorts } from "../models/escorts";
import { Sessions, UserType } from "../services/sessions";
import {
  cleanEscort,
  cleanObject,
  getMediaLinks,
  getUser,
  objectId,
} from "../utils";
import { LoginRequest } from "./client/loginScreens";
import {
  createToken,
  verifyToken,
  refreshToken,
} from "../middleware/jwtService";

export const loginRouter = Router();

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
        session = Sessions.addSession(user);

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
          contacts: user.contacts,


          workingName: escort.workingName,
          email: user.email,
          images,

          token: createToken(session.id),
          refreshToken: refreshToken(session.id),
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

interface RefreshTokenRequest extends Request {
  body: {
    token: string;
  };
}

loginRouter.post(
  "/refreshAccessToken",
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

    const session = await verifyToken(req.body.token, true);
    if (session) {
      return res.json({ accessToken: createToken(session.id) });
    } else {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
);

interface GetUserProfileRequest extends Request {
  params: {
    id: string;
  };
}

loginRouter.get("/user/:id", async (req: GetUserProfileRequest, res) => {
  let escort: Escort | null = await Escorts.findById(objectId(req.params.id));
  if (escort) {
    escort = escort as Escort;
    return res.status(200).json({ user: await cleanEscort(escort) });
  }
  let client: Client | null = await Clients.findById(objectId(req.params.id));
  if (client) {
    client = client as Client;
    return res.status(200).json({
      firstName: client.firstName,
      lastName: client.lastName,
      username: client.username,
      images: client.images,

      height: client.height,
      hairColor: client.hairColor,
      country: client.country,
      gender: client.gender,
      birthday: client.birthday,
      about: client.about,
      education: client.education,

      number: client.number,
      language: client.language,
      ageVerified: client.ageVerified,
    });
  }
});
