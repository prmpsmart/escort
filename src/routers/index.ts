import express from "express";
import { authRouter } from "./auth_router";
import { servicesRouter } from "./services_router";
import { userRouter } from "./user_router";

export const routers = express.Router();

routers.use(
  "/api/auth",
  authRouter
  /**
    #swagger.tags = ['Auth']
     */
);
routers.use(
  "/api/users",
  userRouter /**
    #swagger.tags = ['Users']
     */
);
routers.use(
  "/api/services",
  servicesRouter /**
    #swagger.tags = ['Services']
     */
);
