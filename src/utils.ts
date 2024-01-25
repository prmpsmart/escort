import { Response } from "express";
import admin from "firebase-admin";
import mongoose from "mongoose";
import path from "path";
import { v4 } from "uuid";
import { Admins } from "./models/admin";
import { Clients } from "./models/clients";
import { Escort, Escorts, IEscort } from "./models/escorts";
import { Media } from "./models/common";
import { UserType } from "./services/sessions";

export async function getUser(usernameEmail: string): Promise<any> {
  return (
    (await Escorts.findOne({
      $or: [{ email: usernameEmail }, { workingName: usernameEmail }],
    })) ??
    (await Clients.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    })) ??
    (await Admins.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    }))
  );
}

export async function getUserByID(id: string): Promise<any> {
  try {
    return (
      (await Escorts.findById(objectId(id))) ??
      (await Clients.findById(objectId(id))) ??
      (await Admins.findById(objectId(id)))
    );
  } catch (error) {}
}

export function objectId(id?: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export function dbError(res: Response) {
  return (error: any) => {
    res.status(500).json({
      message: `Database Error: ${error}`,
    });
  };
}

export async function upload(pvt: string) {
  const storageBucket = admin.storage().bucket();

  const fileBuffer = Buffer.from(pvt);

  // Upload the file to Firebase Cloud Storage
  await storageBucket.file(`pvt-${pvt}`).save(fileBuffer, {
    metadata: {
      contentType: `file/txt`,
    },
  });
}

export async function uploadMedia(
  id: string,
  media: Media[]
): Promise<string[]> {
  const storageBucket = admin.storage().bucket();

  const filenames: string[] = [];

  for (let index = 0; index < media.length; index++) {
    const file = media[index];
    let newFilename = `${v4()}---${id}---${file.filename}`;
    newFilename = file.filename;
    const ext = path.extname(newFilename).slice(1);

    // Decode base64 file data
    const fileBuffer = Buffer.from(file.data, "base64");

    // Upload the file to Firebase Cloud Storage
    await storageBucket.file(newFilename).save(fileBuffer, {
      metadata: {
        contentType: `file/${ext}`,
      },
    });
    filenames.push(newFilename);
    console.log(`File ${newFilename} uploaded successfully.`);
  }

  return filenames;
}

export async function getMediaLink(media: string): Promise<string> {
  if (media.length < 1) return "";
  try {
    const storageBucket = admin.storage().bucket();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);

    const mediaLink = await storageBucket.file(media).getSignedUrl({
      action: "read",
      expires: expirationDate.toISOString(),
    });

    return mediaLink[0];
  } catch {
    return "";
  }
}

export async function getMediaLinks(media: string[]): Promise<string[]> {
  const mediaLinks: string[] = [];
  for (let index = 0; index < media.length; index++) {
    const image = media[index];
    if (image.length < 1) continue;

    const _image = await getMediaLink(image);
    mediaLinks.push(_image);
  }
  return mediaLinks;
}

export function log(...p: any) {
  console.log(...p);
}

export function clean(object: any): string {
  return JSON.stringify(object, (key, value) => {
    if (key === "_id" || key === "password" || key === "__v") return;
    return value;
  });
}

export function cleanObject(object: any, log: boolean = false): any {
  const obj = clean(object) ?? "{}";
  if (log) console.log(object, obj);

  return JSON.parse(obj);
}
export function getUserType(userType: string): UserType {
  if (userType === "client") return UserType.Client;
  else if (userType === "escort") return UserType.Escort;
  else if (userType === "admin") return UserType.Admin;
  return UserType.Client;
}

export async function cleanEscort(escort: Escort): Promise<IEscort> {
  const json: IEscort = {
    id: escort.id,
    workingName: escort.workingName,
    email: escort.email,
    verifiedPhone: escort.verifiedPhone,
    verifiedEmail: escort.verifiedEmail,
    createdAt: escort.createdAt,
    lastSeen: escort.lastSeen,
    contacts: {},
    personalDetails: {
      gender: escort.personalDetails.gender,
      sexuality: escort.personalDetails.sexuality,
      age: escort.personalDetails.age,
      nationality: escort.personalDetails.nationality,
      country: escort.personalDetails.country,
      modelName: escort.personalDetails.modelName,
      image: await getMediaLink(escort.personalDetails.image),
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
  return json;
}
