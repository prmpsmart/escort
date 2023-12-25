import Client from "../models/clients";
import Escort from "../models/escorts";

export async function getUser(usernameEmail: string): Promise<any> {
  return (
    (await Escort.findOne({
      $or: [{ email: usernameEmail }, { workingName: usernameEmail }],
    })) ||
    (await Client.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    }))
  );
}
