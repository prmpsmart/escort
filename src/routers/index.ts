import express from "express";
import { checkToken } from "../middleware/checkToken";
import { adminRouter } from "./admin";
import { clientRouter } from "./client";
import { escortRouter } from "./escort";
import { ladiesStarRouter } from "./ladiesStar";
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

routers.use(checkToken);

routers.use(
  "/",
  ladiesStarRouter
  /**
    #swagger.tags = ['User Ladystar']
  */
);
