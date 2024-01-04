import { Response } from "express";
import admin from "firebase-admin";
import mongoose from "mongoose";
import path from "path";
import { v4 } from "uuid";
import { Admins } from "./models/admin";
import { Clients } from "./models/clients";
import { Escorts } from "./models/escorts";

export interface User {
  id?: any;
  email: string;
  password?: string;
  createdAt?: number;
  lastSeen?: number;
}

export interface Media {
  filename: string;
  data: string;
}

export async function getUser(usernameEmail: string): Promise<any> {
  return (
    (await Escorts.findOne({
      $or: [{ email: usernameEmail }, { workingName: usernameEmail }],
    })) ||
    (await Clients.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    })) ||
    (await Admins.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    }))
  );
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

export async function getMediaLinks(media: string[]): Promise<string[]> {
  const mediaLinks: string[] = [];
  const storageBucket = admin.storage().bucket();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3);

  for (let index = 0; index < media.length; index++) {
    const image = media[index];
    const _image = await storageBucket.file(image).getSignedUrl({
      action: "read",
      expires: expirationDate.toISOString(), // Adjust the expiration date as needed
    });
    mediaLinks.push(_image[0]);
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
  const obj = clean(object) ?? '{}';
  if (log) console.log(object, obj);

  return JSON.parse(obj);
}