import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import Chats, { Chat, IChat } from "../models/chats";

export const chatRouter = Router();

interface ChatRequest extends AuthRequest {
  params: {
    user_id: string;
  };
}

chatRouter.get(
  "/oldChats/:user_id",
  async (req: ChatRequest, res: Response) => {
    /**
    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/EscortLoginResponse" }
     }
    #swagger.responses[404] = {
       schema: { $ref: '#/definitions/UserNotFound' }
     }
    #swagger.responses[406] = {
       schema: { $ref: '#/definitions/InvalidCredentials' }
     }
     */

    const user_A = req.session?.id;
    const user_B = req.params.user_id;

    const _chats: Chat[] = await Chats.find({
      $or: [
        { user_1_id: user_A, user_2_id: user_B },
        { user_1_id: user_B, user_2_id: user_A },
      ],
    });
    const chats: IChat[] = [];

    _chats.forEach((chat) => chats.push(chat));

    res.status(200).json({ chats });
  }
);
