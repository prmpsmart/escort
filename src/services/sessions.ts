import Client from "../models/clients";
import Escort from "../models/escorts";

class Session {
  public id: string;

  constructor(public user: Client | Escort) {
    this.id = "";
  }
}

class iSessions {
  constructor(
    public sessionsIds: Map<string, Session> = new Map(),
    public sessionsEmails: Map<string, Session> = new Map()
  ) {}

  public getSessionByID(id: string): Session | undefined {
    return this.sessionsIds.get(id);
  }
  public getSession(email: string): Session | undefined {
    return this.sessionsEmails.get(email);
  }
  public addSession(user: Client | Escort): Session {
    const session = new Session(user);
    this.sessionsIds.set(session.id, session);
    this.sessionsEmails.set(user.email, session);
    return session;
  }
}

export const Sessions = new iSessions();
