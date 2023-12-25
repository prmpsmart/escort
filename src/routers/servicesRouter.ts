import { Response, Router } from "express";
import { AuthRequest, checkToken } from "../middleware/checkToken";

export const servicesRouter = Router();

servicesRouter.use("/", checkToken);

interface AdvertizeRequest extends AuthRequest {
  body: {
    whoAreYou: string;
    name: string;
    number: string;
    email: string;
    sendCopy: boolean;
    website: string;
    city: string;
    query: string;
  };
}
servicesRouter.post("/advertize", (req: AdvertizeRequest, res: Response) => {
  /**
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/AdvertizeRequest" }
      }
  
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */
  res.status(200).json({});
});

interface GetInTouchRequest extends AuthRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    message: boolean;
  };
}
servicesRouter.post("/getInTouch", (req: GetInTouchRequest, res: Response) => {
  /**
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/GetInTouchRequest" }
      }
  
      #swagger.responses[404] = {
          schema: { $ref: '#/definitions/UserNotExists' }
      }
       */
  res.status(200).json({});
});
