import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort } from "../../models/escorts";
import { cleanItem } from "../../utils";

export const profileRouter = Router();

interface EditProfileRequest extends AuthRequest {
  body: {
    modelName: string;
    country: string;
    city: string;
    image: string;
    description: string;
    profileType: string;
    age: number;
    weight: number;
    height: number;
    availableFor: string;
    breastSize: number;
    breastType: string;
    nationality: string;
    travel: string;
    languages: string[];
    tatoo: string;
    piercing: string;
    isPornStar: boolean;
    services: string;

    meetingWith: string;
    cellPhones: string[];
  };
}

profileRouter.post("/profile", (req: EditProfileRequest, res: Response) => {
  /**
      #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/EditProfileRequest" }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
      */
  const escort = req.session?.user as Escort;
  if (req.body.country) escort.personalDetails.country = req.body.country;
  if (req.body.city) escort.location.incall = req.body.city;
  if (req.body.image) escort.personalDetails.image = req.body.image;
  if (req.body.description)
    escort.personalDetails.description = req.body.description;
  if (req.body.profileType)
    escort.personalDetails.gender = req.body.profileType;
  if (req.body.age) escort.personalDetails.age = req.body.age;
  if (req.body.weight) escort.physicalDetails.weight = req.body.weight;
  if (req.body.height) escort.physicalDetails.height = req.body.height;
  if (req.body.availableFor)
    escort.personalDetails.availableFor = req.body.availableFor;
  if (req.body.breastSize)
    escort.physicalDetails.breastSize = req.body.breastSize;
  if (req.body.breastType)
    escort.physicalDetails.breastType = req.body.breastType;
  if (req.body.nationality)
    escort.personalDetails.nationality = req.body.nationality;
  if (req.body.travel) escort.location.outcall.iTravelTo = req.body.travel;
  if (req.body.languages) escort.languages = req.body.languages;
  if (req.body.tatoo) escort.physicalDetails.bodyArt = req.body.tatoo;
  if (req.body.piercing) escort.physicalDetails.bodyArt = req.body.piercing;
  if (req.body.isPornStar)
    escort.personalDetails.isPornStar = req.body.isPornStar;
  if (req.body.services) escort.services = [req.body.services];
  if (req.body.meetingWith) escort.meeting.person = req.body.meetingWith;
  if (req.body.cellPhones) escort.meeting.cellphones = req.body.cellPhones;

  escort.save();

  res.status(200).json({ message: "Profile saved successfully" });
});

profileRouter.get("/profile", (req: AuthRequest, res: Response) => {
  /**
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
      */

  res
    .status(200)
    .send(JSON.stringify({ profile: cleanItem(req.session?.user) }));
});
