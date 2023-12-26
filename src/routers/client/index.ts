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
import { userLadyStarRouter } from "./userLadyStar";

export const clientRouter = express.Router();

clientRouter.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login Screens']
  */
);

clientRouter.use(checkToken);

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

clientRouter.use(
  "/",
  userLadyStarRouter
  /**
    #swagger.tags = ['User Ladystar']
  */
);
