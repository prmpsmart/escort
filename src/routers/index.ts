import express from "express";
import { adminRouter } from "./admin";
import { clientRouter } from "./client";
import { escortRouter } from "./escort";
import { loginRouter } from "./login";

export const routers = express.Router();

routers.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login for both Escort and Client']
     */
);

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
