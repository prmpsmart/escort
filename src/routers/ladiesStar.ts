import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import { Escort, Escorts, IEscort } from "../models/escorts";
import { clean, getMediaLinks } from "../utils";

export const ladiesStarRouter = Router();

ladiesStarRouter.get(
  "/ladiesStars",
  async (req: AuthRequest, res: Response) => {
    /**
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/EscortsProfilesResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    // Execute the query
    const escorts: Escort[] = await Escorts.find();

    const jsons: IEscort[] = [];

    escorts.forEach(async (escort) => {
      jsons.push({
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
      });
    });

    res.status(200).send(JSON.stringify({ users: jsons }));
  }
);
