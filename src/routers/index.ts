import express from "express";
import { clientRouter } from "./client";
import { escortRouter } from "./escort";

export const routers = express.Router();

routers.use(
  "/client",
  clientRouter
  /**
    #swagger.tags = ['Client']
     */
);

routers.use(
  "/escort",
  escortRouter
  /**
    #swagger.tags = ['Escort']
     */
);
