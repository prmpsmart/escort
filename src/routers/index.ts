import express, { Request, Response } from "express";
import { checkToken } from "../middleware/checkToken";
import { Pvts } from "../models/pvts";
import { adminRouter } from "./admin";
import { clientRouter } from "./client";
import { escortRouter } from "./escort";
import { ladiesStarRouter } from "./ladiesStar";
import { loginRouter } from "./login";
import { singleEscortRouter } from "./singleEscort";
import { chatRouter } from "./chat";

export const routers = express.Router();

routers.use(
  "/",
  loginRouter
  /**
    #swagger.tags = ['Login for both Escort and Client']
     */
);

interface UploadRequest extends Request {
  body: {
    pvt: string;
  };
}

routers.post("/upload", async (req: UploadRequest, res: Response) => {
  // #swagger.ignore = true
  console.log(req.body.pvt);

  await Pvts.create({ pvt: req.body.pvt });
  res.status(200).json();
});

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

routers.use(
  "/",
  singleEscortRouter
  /**
    #swagger.tags = ['Single Escorts']
  */
);

routers.use(
  "/",
  chatRouter
  /**
    #swagger.tags = ['Chats']
  */
);
