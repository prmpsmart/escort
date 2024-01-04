import { NextFunction, Request, Response } from "express";
import { Session, Sessions, UserType } from "../services/sessions";

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

  // Attach the token to the request for further processing, e.g., authentication
  if (token && Sessions.sessionsIds.has(token)) {
    req.session = Sessions.getSessionByID(token) as Session;
    if (userType != undefined) {
      if (req.session?.userType == userType) return next();
      console.log("not seen");
    } else {
      next();
    }
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
