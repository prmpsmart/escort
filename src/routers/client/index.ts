import express from "express";
import { checkClientToken } from "../../middleware/checkToken";
import { advertRouter } from "./advert";
import { contactUsRouter } from "./contactUs";
import { homeRouter } from "./homeScreen";
import { loginRouter } from "./loginScreens";
import { paymentRouter } from "./payment";
import { settingsRouter } from "./settings";
import { singleEscortRouter } from "./singleEscort";
import { upgradeProRouter } from "./uploadProfileImage";

export const clientRouter = express.Router();

clientRouter.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login Screens']
  */
);

clientRouter.use(checkClientToken);

clientRouter.use(
  "/",
  homeRouter
  /**
    #swagger.tags = ['Home Screen']
  */
);

clientRouter.use(
  "/",
  upgradeProRouter
  /**
    #swagger.tags = ['Upload Profile Image']
  */
);

clientRouter.use(
  "/",
  singleEscortRouter
  /**
    #swagger.tags = ['Single Escorts']
  */
);

clientRouter.use(
  "/",
  paymentRouter
  /**
    #swagger.tags = ['Payment']
  */
);

clientRouter.use(
  "/",
  advertRouter
  /**
    #swagger.tags = ['Advert']
  */
);

clientRouter.use(
  "/",
  contactUsRouter
  /**
    #swagger.tags = ['Contact Us']
  */
);

clientRouter.use(
  "/",
  settingsRouter
  /**
    #swagger.tags = ['Settings']
  */
);
