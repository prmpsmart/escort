import { Response, Router } from "express";
import { AuthRequest, checkToken } from "../middleware/checkToken";

export const userRouter = Router();

userRouter.use("/", checkToken);

userRouter.get("/profile", (req: AuthRequest, res: Response) => {
  /**
      #swagger.responses[200] = {
          schema: { $ref: '#/components/schemas/UserProfile' }
      }
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */
});

interface UpgradeProRequest extends AuthRequest {
  body: {
    images: Array<string>;
    height: number;
    country: string;
    birthday: string;
    hairColor: string;
    gender: string;
  };
}
userRouter.post("/upgradePro", (req: UpgradeProRequest, res: Response) => {
  /**
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/UpgradeProRequest" }
      }
  
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */
  res.status(200).json({});
});

interface FindEscortsRequest extends AuthRequest {
  body: {
    name: string;
    username: number;
    lookingFor: string;
    ageStart: number;
    ageEnd: number;
    distance: number;
    gender: string;
  };
}
userRouter.post("/findEscorts", (req: FindEscortsRequest, res: Response) => {
  /**
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/FindEscortsRequest" }
      }
  
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */
  res.status(200).json({});
});

// advertize
// getInTouch
