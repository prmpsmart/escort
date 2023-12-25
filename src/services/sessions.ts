import Client from "../models/clients";
import Escort from "../models/escorts";

class Session {
  constructor(
    public id: string = "",
    public user: Client | Escort,
    public last_name: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}
