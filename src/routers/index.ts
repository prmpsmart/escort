import express from "express";
import { adminRouter } from "./admin";
import { clientRouter } from "./client";
import { escortRouter } from "./escort";

export const routers = express.Router();

routers.use(
  "/escort",
  escortRouter
  /**
    #swagger.tags = ['Escort']
     */
);

routers.use(
  "/client",
  clientRouter
  /**
    #swagger.tags = ['Client']
     */
);

routers.use(
  "/admin",
  adminRouter
  /**
    #swagger.tags = ['Admin']
     */
);
