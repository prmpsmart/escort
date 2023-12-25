import express from "express";
import { authRouter } from "./auth_router";
import { servicesRouter } from "./services_router";
import { userRouter } from "./user_router";

export const routers = express.Router();

routers.use(
  "/auth",
  authRouter
  /**
    #swagger.tags = ['Auth']
     */
);
routers.use(
  "/users",
  userRouter /**
    #swagger.tags = ['Users']
     */
);
routers.use(
  "/services",
  servicesRouter /**
    #swagger.tags = ['Services']
     */
);
