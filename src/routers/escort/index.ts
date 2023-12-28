import express from "express";
import { addImageRouter } from "./addImage";
import { addVideoRouter } from "./addVideo";
import { dashboardRouter } from "./dashboard";
import { profileRouter } from "./profile";
import { settingsRouter } from "./settings";
import { signupAndLoginRouter } from "./signupAndLogin";
import { viewGalleryRouter } from "./viewGallery";
import { checkEscortToken } from "../../middleware/checkToken";

export const escortRouter = express.Router();

escortRouter.use(
  "/",
  signupAndLoginRouter
  /**
    #swagger.tags = ['Escort Sign Up and Login']
  */
);

escortRouter.use(checkEscortToken);

escortRouter.use(
  "/",
  dashboardRouter
  /**
    #swagger.tags = ['Escort Dashboard']
  */
);

escortRouter.use(
  "/",
  addImageRouter
  /**
    #swagger.tags = ['Add Image']
  */
);

escortRouter.use(
  "/",
  viewGalleryRouter
  /**
    #swagger.tags = ['View Gallery']
  */
);

escortRouter.use(
  "/",
  addVideoRouter
  /**
      #swagger.tags = ['Add Video']
    */
);

escortRouter.use(
  "/",
  settingsRouter
  /**
      #swagger.tags = ['Escort Settings']
    */
);

escortRouter.use(
  "/",
  profileRouter
  /**
      #swagger.tags = ['Escort Profile']
    */
);
