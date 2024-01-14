import jwt from "jsonwebtoken";

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

export const verifyToken = (
  token: string,
  refresh: boolean = false
): string => {
  try {
    const payload = jwt.verify(token, secretKey) as Payload;
    if (refresh) {
      if (!payload.refresh) {
        return "";
      }
    }
    return payload.session_id;
  } catch (error) {
    return "";
  }
};
