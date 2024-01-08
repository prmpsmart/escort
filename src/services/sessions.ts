import { User } from "../utils";

export enum UserType {
  Client,
  Escort,
  Admin,
}
export class Session {
  public id: string;

  constructor(public user: User, public userType: UserType) {
    this.id = user.id;
  }

  public get isClient(): boolean {
    return this.userType == UserType.Client;
  }
  public get isEscort(): boolean {
    return this.userType == UserType.Escort;
  }
  public get isAdmin(): boolean {
    return this.userType == UserType.Admin;
  }
}

export class _Sessions {
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
  public addSession(user: User, userType: UserType): Session {
    const session = new Session(user, userType);
    this.sessionsIds.set(session.id, session);
    this.sessionsEmails.set(user.email, session);
    return session;
  }
}

export const Sessions = new _Sessions();
