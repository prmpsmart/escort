import { NextFunction, Request, Response } from "express";
import { Session, Sessions, UserType } from "../services/sessions";
import { verifyToken } from "./jwtService";

// Extend the Request interface to include the 'token' property
export interface AuthRequest extends Request {
  session?: Session;
}

// Middleware to check for Bearer token
export const checkToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  userType?: UserType
) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with 'Bearer '
  let token: string = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the header
    token = authHeader.split(" ")[1];
  }

  if (token.length > 0) {
    const session_id = verifyToken(token);
    //
    if (session_id.length > 0) {
      //
      const session_exists = Sessions.sessionsIds.has(session_id);

      if (session_exists) {
        req.session = Sessions.getSessionByID(session_id);
      } else {
        return res.status(401).json({ message: "Session is over." });
      }
      //
      if (userType != undefined) {
        if (req.session?.userType == userType) return next();
        else return res.status(401).json({ message: "Invalid User" });
      } else {
        return next();
      }
      //
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export const checkClientToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, UserType.Client);
};

export const checkEscortToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, UserType.Escort);
};

export const checkAdminToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  return checkToken(req, res, next, UserType.Admin);
};
