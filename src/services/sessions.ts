import { DClient } from "../models/clients";
import { DEscort } from "../models/escorts";

export class Session {
  public id: string;

  constructor(public user: DClient | DEscort) {
    this.id = user.id;
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
  public getSessionByEmail(email: string): Session | undefined {
    return this.sessionsEmails.get(email);
  }
  public addSession(user: DClient | DEscort): Session {
    const session = new Session(user);
    this.sessionsIds.set(session.id, session);
    this.sessionsEmails.set(user.email, session);
    return session;
  }
}

export const Sessions = new iSessions();
