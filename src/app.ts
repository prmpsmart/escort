import * as bodyParser from "body-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { routers } from "./routers";
import swaggerOutput from "./swagger_output.json";

export const app = express();
// const port = 3000;

app.use("/", routers);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(bodyParser.json());

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
//   console.log(`Swagger is running at http://localhost:${port}/docs`);
// });
