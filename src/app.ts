import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { Client } from "./models/clients";
import { Escort } from "./models/escorts";
import { routers } from "./routers/index";
import { Session, Sessions } from "./services/sessions";
import swaggerOutput from "./swaggerOutput.json";
import { verifyToken } from "./middleware/jwtService";

dotenv.config();

const serviceAccount = require("../escorts_storage.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "escorts-4607e.appspot.com",
});

export const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  // allowEIO3: true,
  path: "/ws",
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("Client connected.");

  const token = socket.handshake.auth.token as string | undefined;

  if (token) {
    console.log("User connected with token");

    const session_id = verifyToken(token);
    let session: Session | undefined;

    console.log(session_id, session);

    if (session_id) Sessions.getSessionByID(session_id);

    if (session) {
      let user = session.isEscort
        ? (session.user as Escort)
        : (session.user as Client);

      user.lastSeen = Date.now();
      user.save();

      io.emit("userStatus", { userId: socket.id, status: "online" });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        user.lastSeen = Date.now();
        user.save();

        io.emit("userStatus", { userId: socket.id, status: "offline" });
      });
    } else {
      socket.emit("invalid_session", "Login in again");
      socket.disconnect(true);
    }
  } else {
    socket.emit("invalid_token", "Token is not provided");
    console.log("User connection denied: Invalid or missing token");
    socket.disconnect(true);
  }
});

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

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

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/", routers);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/docs`);
});
