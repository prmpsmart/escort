import express from "express";
import { clientRouters } from "./client";

export const routers = express.Router();

routers.use(
  "/client",
  clientRouters
  /**
    #swagger.tags = ['Client']
     */
);

// routers.use(
//   "/auth",
//   authRouter
//   /**
//     #swagger.tags = ['Auth', 'Router']
//      */
// );
// routers.use(
//   "/users",
//   userRouter /**
//     #swagger.tags = ['Users']
//      */
// );
// routers.use(
//   "/services",
//   servicesRouter /**
//     #swagger.tags = ['Services', 'Router']
//      */
// );
