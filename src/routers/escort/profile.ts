import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort, Escorts, IEscort } from "../../models/escorts";

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
    escort.personalDetails.image = req.body.image;
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
  const escort = req.session?.user as Escort;
  const json: IEscort = {
    id: escort.id,
    workingName: escort.workingName,
    email: escort.email,
    verifiedPhone: escort.verifiedPhone,
    verifiedEmail: escort.verifiedEmail,
    createdAt: escort.createdAt,
    lastSeen: escort.lastSeen,
    personalDetails: {
      gender: escort.personalDetails.gender,
      sexuality: escort.personalDetails.sexuality,
      age: escort.personalDetails.age,
      nationality: escort.personalDetails.nationality,
      country: escort.personalDetails.country,
      modelName: escort.personalDetails.modelName,
      image: escort.personalDetails.image,
      description: escort.personalDetails.description,
      availableFor: escort.personalDetails.availableFor,
      isPornStar: escort.personalDetails.isPornStar,
    },
    physicalDetails: {
      chest: escort.physicalDetails.chest,
      waist: escort.physicalDetails.waist,
      hips: escort.physicalDetails.hips,
      ethnicity: escort.physicalDetails.ethnicity,
      hairColour: escort.physicalDetails.hairColour,
      height: escort.physicalDetails.height,
      weight: escort.physicalDetails.weight,
      eyeColour: escort.physicalDetails.eyeColour,
      genetalia: escort.physicalDetails.genetalia,
      cupSize: escort.physicalDetails.cupSize,
      breastImplant: escort.physicalDetails.breastImplant,
      breastSize: escort.physicalDetails.breastSize,
      breastType: escort.physicalDetails.breastType,
      bodyType: escort.physicalDetails.bodyType,
      bodyArt: escort.physicalDetails.bodyArt,
      piercing: escort.physicalDetails.piercing,
    },
    languages: escort.languages,
    bookingNotes: escort.bookingNotes,
    location: {
      incall: escort.location.incall,
      outcall: {
        location: escort.location.outcall.location,
        iTravelTo: escort.location.outcall.iTravelTo,
      },
    },
    price: {
      incall: {
        hour1: escort.price.incall.hour1,
        hour2: escort.price.incall.hour2,
        hour3: escort.price.incall.hour3,
      },
      outcall: {
        hour1: escort.price.outcall.hour1,
        hour2: escort.price.outcall.hour2,
        hour3: escort.price.outcall.hour3,
      },
    },
    availability: {
      monday: escort.availability.monday,
      tuesday: escort.availability.tuesday,
      wednesday: escort.availability.wednesday,
      thurday: escort.availability.thurday,
      friday: escort.availability.friday,
      saturday: escort.availability.saturday,
      sunday: escort.availability.sunday,
    },
    meeting: {
      person: escort.meeting.person,
      cellphones: escort.meeting.cellphones,
    },
    services: escort.services,
    images: escort.images,
    videos: escort.videos,
  };

  res.status(200).send(JSON.stringify({ profile: json }));
});
