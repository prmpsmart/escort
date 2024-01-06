import { Request, Response, Router } from "express";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { clean, getMediaLinks, objectId } from "../utils";

export const singleEscortRouter = Router();

interface GetUserProfileRequest extends Request {
  params: {
    id: string;
  };
}

singleEscortRouter.get(
  "/userProfile/:id",
  async (req: GetUserProfileRequest, res: Response) => {
    /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/EscortProfile' }
      }
      #swagger.responses[401] = {
          schema: { $ref: '#/definitions/InvalidSession' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */

    let escort: Escort | null = await Escorts.findOne({
      _id: objectId(req.params.id),
    });
    if (escort) {
      escort = escort as Escort;
      // escort.personalDetails.image = (
      //   await getMediaLinks([escort.personalDetails.image])
      // )[0];
      // escort.images = await getMediaLinks(escort.images);
      // escort.videos = await getMediaLinks(escort.videos);

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
          image: (await getMediaLinks([escort.personalDetails.image]))[0],
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
        images: await getMediaLinks(escort.images),
        videos: await getMediaLinks(escort.videos),
      };

      res.status(200).send(JSON.stringify({ profile: json }));
    } else res.status(404).json({ message: "Escort not found" });
  }
);
