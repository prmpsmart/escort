import jwt from "jsonwebtoken";

const secretKey = `${process.env.jwt_key}`;

export interface Payload {
  session_id: string;
  //   exp: number;
}

export const createToken = (session_id: string): string => {
  const payload: Payload = { session_id };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const refreshToken = (session_id: string): string => {
  const payload: Payload = { session_id };

  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

export const verifyToken = (token: string): string => {
  try {
    const payload = jwt.verify(token, secretKey) as Payload;
    return payload.session_id;
  } catch (error) {
    return "";
  }
};
