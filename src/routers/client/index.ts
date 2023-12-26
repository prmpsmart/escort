import express from "express";
import { checkToken } from "../../middleware/checkToken";
import { advertRouter } from "./advert";
import { contactUsRouter } from "./contactUs";
import { homeRouter } from "./homeScreen";
import { loginRouter } from "./loginScreens";
import { paymentRouter } from "./payment";
import { settingsRouter } from "./settings";
import { singleEscortRouter } from "./singleEscort";
import { upgradeProRouter } from "./uploadProfileImage";

export const clientRouters = express.Router();

clientRouters.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login Screens']
  */
);

clientRouters.use(checkToken);

clientRouters.use(
  "/",
  homeRouter
  /**
    #swagger.tags = ['Home Screen']
  */
);

clientRouters.use(
  "/",
  upgradeProRouter
  /**
    #swagger.tags = ['Upload Profile Image']
  */
);

clientRouters.use(
  "/",
  singleEscortRouter
  /**
    #swagger.tags = ['Single Escorts']
  */
);

clientRouters.use(
  "/",
  paymentRouter
  /**
    #swagger.tags = ['Payment']
  */
);

clientRouters.use(
  "/",
  advertRouter
  /**
    #swagger.tags = ['Advert']
  */
);

clientRouters.use(
  "/",
  contactUsRouter
  /**
    #swagger.tags = ['Contact Us']
  */
);

clientRouters.use(
  "/",
  settingsRouter
  /**
    #swagger.tags = ['Settings']
  */
);
