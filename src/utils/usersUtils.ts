import mongoose from "mongoose";
import { Admins } from "../models/admin";
import { Clients } from "../models/clients";
import { Escorts } from "../models/escorts";

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
