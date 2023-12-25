import express from "express";
import { authRouter } from "./authRouter";
import { servicesRouter } from "./servicesRouter";
import { userRouter } from "./userRouter";

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
