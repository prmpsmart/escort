import { NextFunction, Request, Response } from "express";
import { Session, Sessions } from "../services/sessions";

// Extend the Request interface to include the 'token' property
export interface AuthRequest extends Request {
  token?: string;
  session?: Session;
}

// Middleware to check for Bearer token
export const checkToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the Authorization header
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header exists and starts with 'Bearer '
  let token: string = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the header
    token = authHeader.split(" ")[1];
  }

  // Attach the token to the request for further processing, e.g., authentication
  if (token && Sessions.sessionsIds.has(token)) {
    req.token = token;
    req.session = Sessions.getSessionByID(token);
    // Call the next middleware or route handler
    return next();
  }

  // If no Bearer token is found, return an unauthorized response
  return res
    .status(401)
    .json({ error: "Unauthorized - Bearer token missing or invalid" });
};
