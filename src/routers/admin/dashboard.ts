import { Request, Response, Router } from "express";
import { Clients } from "../../models/clients";
import { Escorts } from "../../models/escorts";
import Reports from "../../models/reports";

export const dashboardRouter = Router();

interface AdminDashboardResponse {
  totalUsers: number;
  activeUsers: number;
  emailUnverifiedUsers: number;
  mobileUnverifiedUsers: number;
  totalPayment: number;
  pendingPayment: number;
  rejectedPayment: number;
  paymentCharge: number;
  purchasedPackage: number;
  totalInterests: number;
  ignoredProfiles: number;
  reports: number;
}

dashboardRouter.get("/dashboard", async (req: Request, res: Response) => {
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

  const activeUsers = await Escorts.countDocuments();

  const json: AdminDashboardResponse = {
    totalUsers: activeUsers + (await Clients.countDocuments({})),
    activeUsers: activeUsers,
    emailUnverifiedUsers: await Escorts.countDocuments({
      verifiedEmail: false,
    }),
    mobileUnverifiedUsers: await Escorts.countDocuments({
      verifiedPhone: false,
    }),
    totalPayment: 0,
    pendingPayment: 0,
    rejectedPayment: 0,
    paymentCharge: 0,
    purchasedPackage: 0,
    totalInterests: 0,
    ignoredProfiles: 0,
    reports: await Reports.countDocuments(),
  };
  res.status(200).json(json);
});
