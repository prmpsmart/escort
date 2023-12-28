import { NextFunction, Request, Response } from "express";
import {
  AdminSessions,
  ClientSessions,
  EscortSessions,
  Session,
  Sessions,
} from "../services/sessions";

// Extend the Request interface to include the 'token' property
export interface AuthRequest extends Request {
  token?: string;
  session?: Session;
}

// Middleware to check for Bearer token
export const checkToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  sessions: Sessions
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
  if (token && sessions.sessionsIds.has(token)) {
    req.token = token;
    req.session = sessions.getSessionByID(token);
    // Call the next middleware or route handler
    return next();
  }

  // If no Bearer token is found, return an unauthorized response
  return res
    .status(401)
    .json({ message: "Unauthorized - Bearer token missing or invalid" });
};

export const checkClientToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, ClientSessions);
};

export const checkEscortToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, EscortSessions);
};

export const checkAdminToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, AdminSessions);
};
