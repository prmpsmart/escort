import jwt from "jsonwebtoken";
import { Session, Sessions, UserType } from "../services/sessions";
import { getUser, getUserByID } from "../utils";

const secretKey = `${process.env.jwt_key}`;

export interface Payload {
  session_id: string;
  refresh: boolean;
}

export const createToken = (session_id: string): string => {
  const payload: Payload = { session_id, refresh: false };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const refreshToken = (session_id: string): string => {
  const payload: Payload = { session_id, refresh: true };

  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

export const verifyToken = async (
  token: string,
  refresh: boolean = false
): Promise<Session | undefined> => {
  try {
    const payload = jwt.verify(token, secretKey) as Payload;
    let session = Sessions.getSessionByID(payload.session_id);
    if (!session) {
      const user = await getUserByID(payload.session_id);
      if (user) {
        session = Sessions.addSession(user);
      }
    }
    if (session)
      if (refresh) {
        if (payload.refresh) {
          return session;
        }
      } else return session;
  } catch (error) {}
};
