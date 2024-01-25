import { Socket } from "socket.io";
import { User } from "../models/common";
import { getUserType } from "../utils";

export enum UserType {
  Client,
  Escort,
  Admin,
}
export class Session {
  id: string;
  socket?: Socket;

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
  // public set socket(soc: Socket) {
  //   this._socket = soc;
  // }
  // public get socket(): Socket | undefined {
  //   return this._socket;
  // }
}

class _Sessions {
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
    const session = new Session(user, getUserType(user.userType ?? ""));
    this.sessionsIds.set(session.id, session);
    this.sessionsEmails.set(user.email, session);
    return session;
  }
}

export const Sessions = new _Sessions();
