import express from "express";
import { usersRouter } from "./activeUsers";
import { dashboardRouter } from "./dashboard";
import { packagesRouter } from "./packages";
import { settingsRouter } from "./settings";

export const adminRouter = express.Router();

adminRouter.use(
  "/",
  dashboardRouter
  /**
    #swagger.tags = ['Admin Dashboard']
  */
);

adminRouter.use(
  "/",
  packagesRouter
  /**
    #swagger.tags = ['Admin All Packages']
  */
);

adminRouter.use(
  "/",
  usersRouter
  /**
    #swagger.tags = ['Admin Active Users']
  */
);

adminRouter.use(
  "/",
  settingsRouter
  /**
    #swagger.tags = ['Admin Settings']
  */
);
