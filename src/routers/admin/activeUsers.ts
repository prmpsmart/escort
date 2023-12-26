import { Request, Response, Router } from "express";

export const usersRouter = Router();
interface ActiveUsersRequest extends Request {
  query: {
    usernameEmail: string;
  };
}
interface User {
  name: string;
  id: string;
  email: string;
  phone: string;
  country: string;
  joinedAt: number;
  balance: number;
}

interface UsersResponse {
  users: Array<User>;
}

usersRouter.get("/users", (req: ActiveUsersRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/ActiveUsersRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/UsersResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

  const json: UsersResponse = {
    users: [],
  };
  res.status(200).json(json);
});
