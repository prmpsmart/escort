import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import { Escorts, IEscort } from "../../models/escorts";
import { Sessions, UserType } from "../../services/sessions";
import { getUser } from "../../utils";

export const signupAndLoginRouter = Router();

interface EscortR extends IEscort {
  id: string;
}

interface LoginResponse {
  workingName: string;
  email: string;

  token: string;
  message: string;
  profile: EscortR;
}

interface EscortSignupRequest extends Request {
  body: {
    workingName: string;
    email: string;
    password: string;
  };
}

signupAndLoginRouter.post(
  "/signup",
  async (req: EscortSignupRequest, res: Response) => {
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
        const escort = await Escorts.create({
          workingName: req.body.workingName,
          email: req.body.email,
          password: req.body.password,
        });

        const session = Sessions.addSession(escort, UserType.Escort);

        const json: LoginResponse = {
          workingName: escort.workingName,
          email: escort.email,

          token: session.id,
          message: "Signup Successful",
          profile: {
            id: escort.id,
            workingName: escort.workingName,
            email: escort.email,
            verifiedPhone: escort.verifiedPhone,
            verifiedEmail: escort.verifiedEmail,
            createdAt: escort.createdAt,
            personalDetails: escort.personalDetails,
            physicalDetails: escort.physicalDetails,
            languages: escort.languages,
            bookingNotes: escort.bookingNotes,
            location: escort.location,
            price: escort.price,
            availability: escort.availability,
            services: escort.services,
            images: escort.images,
            videos: escort.videos,
            meeting: escort.meeting,
          },
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
);
