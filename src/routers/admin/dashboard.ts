import { Request, Response, Router } from "express";

export const dashboardRouter = Router();

interface AdminDashboardResponse {
  totalUsers: number;
  activeUsers: number;
  emailUnverfiedUsers: number;
  mobileUnverfiedUsers: number;
  totalPayment: number;
  pendingPayment: number;
  rejectedPayment: number;
  paymentCharge: number;
  purchasedPackage: number;
  totalInterests: number;
  ignoredProfiles: number;
  reports: number;
}

dashboardRouter.get("/dashboard", (req: Request, res: Response) => {
  /**
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/AdminDashboardResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json: AdminDashboardResponse = {
    totalUsers: 0,
    activeUsers: 0,
    emailUnverfiedUsers: 0,
    mobileUnverfiedUsers: 0,
    totalPayment: 0,
    pendingPayment: 0,
    rejectedPayment: 0,
    paymentCharge: 0,
    purchasedPackage: 0,
    totalInterests: 0,
    ignoredProfiles: 0,
    reports: 0,
  };
  res.status(200).json(json);
});
