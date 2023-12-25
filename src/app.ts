import * as bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { routers } from "./routers/index.js";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

export const app = express();
const port = 3000;

mongoose.connect(`${process.env.mongoUri}`).then((value) => {
  console.log(`Connected to Mongo Server running at ${process.env.mongoUri}`);
});

app.use("/", routers);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/docs`);
});
