import Client from "../models/clients";
import Escort from "../models/escorts";

export async function getUser(
  usernameEmail: string,
  isEscort: boolean
): Promise<any> {
  if (isEscort)
    return await Escort.findOne({
      $or: [{ email: usernameEmail }, { workingName: usernameEmail }],
    });
  else
    return await Client.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }],
    });
}
