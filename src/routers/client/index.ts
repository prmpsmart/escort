import express from "express";
import { homeRouter } from "./homeScreen";
import { loginRouter } from "./loginScreens";
import { upgradeProRouter } from "./uploadProfileImage";

export const clientRouters = express.Router();

clientRouters.use(
  "/",
  homeRouter
  /**
    #swagger.tags = ['Home Screen']
  */
);
clientRouters.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login Screens']
  */
);
clientRouters.use(
  "/",
  upgradeProRouter
  /**
    #swagger.tags = ['Upload Profile Image']
  */
);
