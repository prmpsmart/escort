import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import EscortRequests from "../../models/requests";

export const dashboardRouter = Router();

interface EscortRequest {
  name: string;
  age: number;
  location: string;
  status: string;

  escort_id: string;
  client_id: string;
}

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
  requests: EscortRequest[];
}

dashboardRouter.get("/dashboard", async (req: AuthRequest, res: Response) => {
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

  const _requests = await EscortRequests.find({
    escort_id: req.session?.user.id,
  });

  const requests: EscortRequest[] = [];
  _requests.forEach((request) => {
    requests.push({
      name: request.name,
      age: request.age,
      location: request.location,
      status: request.status,

      escort_id: request.escort_id,
      client_id: request.client_id,
    });
  });

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
    requests,
  };
  res.status(200).json(json);
});
