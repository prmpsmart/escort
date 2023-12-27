import { Clients } from "../models/clients";
import { Escorts } from "../models/escorts";

export async function getUser(usernameEmail: string): Promise<any> {
  return (
    (await Escorts.findOne({
      $or: [{ email: usernameEmail }, { workingName: usernameEmail }],
    })) ||
    (await Clients.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    }))
  );
}
