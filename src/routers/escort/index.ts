import express from "express";
import { checkToken } from "../../middleware/checkToken";
import { addImageRouter } from "./addImage";
import { addVideoRouter } from "./addVideo";
import { dashboardRouter } from "./dashboard";
import { settingsRouter } from "./settings";
import { signupAndLoginRouter } from "./signupAndLogin";
import { viewGalleryRouter } from "./viewGallery";
import { profileRouter } from "./profile";

export const escortRouter = express.Router();

escortRouter.use(
  "/",
  dashboardRouter
  /**
    #swagger.tags = ['Escort Dashboard']
  */
);

escortRouter.use(checkToken);

escortRouter.use(
  "/",
  signupAndLoginRouter
  /**
    #swagger.tags = ['Escort Sign Up and Login']
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
