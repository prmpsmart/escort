import { Request, Response, Router } from "express";
import { Escorts } from "../../models/escorts";

export const usersRouter = Router();
interface ActiveUsersRequest extends Request {
  query: {
    usernameEmail: string;
  };
}
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  joinedAt: number;
  balance: number;
}

interface ActiveUsersResponse {
  users: Array<User>;
}

usersRouter.get("/users", async (req: ActiveUsersRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/ActiveUsersRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/ActiveUsersResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const users = new Array<User>();

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const escorts = await Escorts.find({
    lastSeen: { $gte: twoWeeksAgo.getTime() },
  });

  escorts.forEach((escort) => {
    users.push({
      id: escort.id,
      name: escort.workingName,
      email: escort.email,
      phone: "",
      country: escort.personalDetails.nationality,
      joinedAt: escort.createdAt as number,
      balance: 500,
    });
  });

  res.status(200).json({ users });
});
