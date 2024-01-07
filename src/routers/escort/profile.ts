import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort, Escorts, IEscort } from "../../models/escorts";
import { cleanEscort, getMediaLinks, uploadMedia } from "../../utils";

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

profileRouter.post(
  "/profile",
  async (req: EditProfileRequest, res: Response) => {
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

    if (req.body.modelName != undefined) {
      escort.personalDetails.modelName = req.body.modelName;
    }
    if (req.body.country != undefined) {
      escort.personalDetails.country = req.body.country;
    }
    if (req.body.city != undefined) {
      escort.location.incall = req.body.city;
    }
    if (req.body.image != undefined) {
      escort.personalDetails.image = (
        await uploadMedia(escort.id, [
          { filename: "profile-image", data: req.body.image },
        ])
      )[0];
    }
    if (req.body.description != undefined) {
      escort.personalDetails.description = req.body.description;
    }
    if (req.body.profileType != undefined) {
      escort.personalDetails.gender = req.body.profileType;
    }
    if (req.body.age != undefined) {
      escort.personalDetails.age = req.body.age;
    }
    if (req.body.weight != undefined) {
      escort.physicalDetails.weight = req.body.weight;
    }
    if (req.body.height != undefined) {
      escort.physicalDetails.height = req.body.height;
    }
    if (req.body.availableFor != undefined) {
      escort.personalDetails.availableFor = req.body.availableFor;
    }
    if (req.body.breastSize != undefined) {
      escort.physicalDetails.breastSize = req.body.breastSize;
    }
    if (req.body.breastType != undefined) {
      escort.physicalDetails.breastType = req.body.breastType;
    }
    if (req.body.nationality != undefined) {
      escort.personalDetails.nationality = req.body.nationality;
    }
    if (req.body.travel != undefined) {
      escort.location.outcall.iTravelTo = req.body.travel;
    }
    if (req.body.languages != undefined) {
      escort.languages = req.body.languages;
    }
    if (req.body.tatoo != undefined) {
      escort.physicalDetails.bodyArt = req.body.tatoo;
    }
    if (req.body.piercing != undefined) {
      escort.physicalDetails.bodyArt = req.body.piercing;
    }
    if (req.body.isPornStar != undefined) {
      escort.personalDetails.isPornStar = req.body.isPornStar;
    }
    if (req.body.services != undefined) {
      escort.services = [req.body.services];
    }
    if (req.body.meetingWith != undefined) {
      escort.meeting.person = req.body.meetingWith;
    }
    if (req.body.cellPhones != undefined) {
      escort.meeting.cellphones = req.body.cellPhones;
    }

    escort.save();

    res.status(200).json({ message: "Profile saved successfully" });
  }
);

profileRouter.get("/profile", async (req: AuthRequest, res: Response) => {
  /**
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
      */
  const escort = req.session?.user as Escort;
  res.status(200).send(JSON.stringify({ profile: await cleanEscort(escort) }));
});
