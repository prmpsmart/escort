import jwt from "jsonwebtoken";

const secretKey = `${process.env.jwt_key}`;

export interface Payload {
  session_id: string;
  //   exp: number;
}

export const createToken = (session_id: string): string => {
  const expInSeconds = 5;
  //   const expirationTime = Math.floor(Date.now() / 1000) + expInSeconds;
  const payload: Payload = { session_id };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string => {
  try {
    const payload = jwt.verify(token, secretKey) as Payload;
    return payload.session_id;
  } catch (error) {
    return "";
  }
};
