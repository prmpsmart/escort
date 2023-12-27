import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
// import { createIndexes } from "./models/index.js";
import cors from "cors";
import { routers } from "./routers/index.js";
import swaggerOutput from "./swaggerOutput.json";
// import { addEscortsToDatabase } from "./zdummy/escorts.js";

dotenv.config();

export const app = express();
const port = 3000;

mongoose
  .connect(`${process.env.mongoUri}`)
  .then(async (value) => {
    // await createIndexes(value.connections[0]);
    console.log(`Connected to Mongo Server running at ${process.env.mongoUri}`);
    // await addEscortsToDatabase(30);
  })
  .catch((reason) => {
    console.log(`Connection to Mongo Server error ${reason}`);
  });

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use("/", routers);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/docs`);
});
