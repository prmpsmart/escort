import { Request, Response, Router } from "express";

export const dashboardRouter = Router();

interface DashboardResponse {
  remainingInterests: number;
  remainingContactView: number;
  currentEscort: number;
  imageUploaded: number;
  interestRequests: number;
  currentPackage: {
    tier: string;
    advertPost: number;
    contactView: number;
    imageUpload: number;
    expiryDate: number;
  };
}

dashboardRouter.get("/dashboard", (req: Request, res: Response) => {
  /**
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/DashboardResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json: DashboardResponse = {
    remainingInterests: 0,
    remainingContactView: 0,
    currentEscort: 0,
    imageUploaded: 0,
    interestRequests: 0,
    currentPackage: {
      tier: "",
      advertPost: 0,
      contactView: 0,
      imageUpload: 0,
      expiryDate: 0,
    },
  };
  res.status(200).json(json);
});
