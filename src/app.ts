import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { Client } from "./models/clients";
import { Escort } from "./models/escorts";
import { routers } from "./routers/index";
import { Session, Sessions } from "./services/sessions";
import swaggerOutput from "./swaggerOutput.json";
import { verifyToken } from "./middleware/jwtService";
import { handleChat } from "./routers/chat";

dotenv.config();

const serviceAccount = require("../escorts_storage.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "escorts-4607e.appspot.com",
});

export const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  cors({
    // origin: [
    //   "https://lazerescort.netlify.app",
    //   "http://localhost:3000",
    //   "http://localhost:8000",
    // ],
    origin: "*",
  })
);

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/ws",
});

if (process.env.NODE_ENV === "development") {
  io.engine.on("initial_headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = true;
  });

  io.engine.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = true;
  });
}

io.on("connect", (socket) => {
  console.log("Client connected.", socket.id);

  const token = socket.handshake.auth.token as string | undefined;

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected: ", socket.id, reason);
  });

  if (token) {
    console.log("User connected with token");

    const session_id = verifyToken(token);
    let session: Session | undefined;

    if (session_id) session = Sessions.getSessionByID(session_id);
    console.log(session?.user.email);

    //   if (session) {
    //     console.log("Session is valid");

    //     session.socket = socket;

    //     let user = session.isEscort
    //       ? (session.user as Escort)
    //       : (session.user as Client);

    //     // user.lastSeen = Date.now();
    //     // user.save();

    //     socket.broadcast.emit("userStatus", {
    //       userId: user.id,
    //       status: "online",
    //     });
    //     socket.emit("acknowledgement", "Connection to Server is Acknowledged");

    //     handleChat(socket, session);

    //     socket.on("disconnect", () => {
    //       console.log(`User disconnected: ${socket.id}`);

    //       // user.lastSeen = Date.now();
    //       // user.save();

    //       socket.broadcast.emit("userStatus", {
    //         userId: user.id,
    //         status: "offline",
    //       });
    //     });
    //   } else {
    //     socket.emit("invalid_session", "Login in again");
    //     console.log("User connection denied: Invalid provided token");
    //     socket.disconnect(true);
    //   }
  } else {
    socket.emit("invalid_token", "Token is not provided");
    console.log("User connection denied: Invalid or missing token");
    socket.disconnect(true);
  }
});

mongoose
  .connect(`${process.env.mongoUri}`)
  .then(async (value) => {
    // await createIndexes(value.connections[0]);
    console.log(`Connected to Mongo Server running at ${process.env.mongoUri}`);
    // await addEscortsToDatabase(30);
    // await addPackagesToDB();
    // await addAdmin();
  })
  .catch((reason) => {
    console.log(`Connection to Mongo Server error ${reason}`);
  });

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl === "/stripe_webhook") {
    next();
  } else {
    bodyParser.json({ limit: "50mb" })(req, res, next);
  }
});
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/", routers);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const port = 3001;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/docs`);
});
