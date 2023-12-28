import express from "express";
import { checkAdminToken } from "../../middleware/checkToken";
import { usersRouter } from "./activeUsers";
import { dashboardRouter } from "./dashboard";
import { loginRouter } from "./login";
import { packagesRouter } from "./packages";
import { settingsRouter } from "./settings";

export const adminRouter = express.Router();

adminRouter.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Admin Login']
  */
);

adminRouter.use(checkAdminToken);

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
