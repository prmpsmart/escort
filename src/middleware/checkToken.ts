import { NextFunction, Request, Response } from "express";
import { Sessions } from "../services/sessions";

// Extend the Request interface to include the 'token' property
export interface AuthRequest extends Request {
  token?: string;
}

// Middleware to check for Bearer token
export const checkToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Exclude paths from token check
  //   const excludedPaths = ["/login", "/signup"];

  //   // Check if the requested path is in the exclusion list
  //   if (excludedPaths.includes(req.path)) {
  //     // If the path is excluded, skip token check and move to the next middleware or route handler
  //     return next();
  //   }

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
    // Call the next middleware or route handler
    return next();
  }

  // If no Bearer token is found, return an unauthorized response
  return res
    .status(401)
    .json({ error: "Unauthorized - Bearer token missing or invalid" });
};
