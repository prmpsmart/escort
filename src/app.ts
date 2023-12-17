import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

// Extend the Request interface to include the 'token' property
interface AuthRequest extends Request {
  token?: string;
}
// Middleware to check for Bearer token
const checkToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Exclude paths from token check
  const excludedPaths = ["/login", "/signup"];

  // Check if the requested path is in the exclusion list
  if (excludedPaths.includes(req.path)) {
    // If the path is excluded, skip token check and move to the next middleware or route handler
    return next();
  }

  // Get the Authorization header
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header exists and starts with 'Bearer '
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Attach the token to the request for further processing, e.g., authentication
    req.token = token;

    // Call the next middleware or route handler
    return next();
  }

  // If no Bearer token is found, return an unauthorized response
  return res
    .status(401)
    .json({ error: "Unauthorized - Bearer token missing or invalid" });
};
// Use the checkToken middleware for all routes or specific routes where authentication is required
app.use(checkToken);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/login", (req: Request, res: Response) => {
  // No token check for /login
  res.send("Login route");
});

app.get("/signup", (req: Request, res: Response) => {
  // No token check for /signup
  res.send("Signup route");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
