import { User } from "../utils/user";

export class Session {
  public id: string;

  constructor(public user: User) {
    this.id = user.id;
  }
}

export class Sessions {
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
  public addSession(user: User): Session {
    const session = new Session(user);
    this.sessionsIds.set(session.id, session);
    this.sessionsEmails.set(user.email, session);
    return session;
  }
}

export const ClientSessions = new Sessions();
export const EscortSessions = new Sessions();
export const AdminSessions = new Sessions();
