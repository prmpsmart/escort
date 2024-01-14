import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import Chats, { Chat, IChat } from "../models/chats";
import { Socket } from "socket.io";
import { Session } from "../services/sessions";

export const chatRouter = Router();

interface ChatRequest extends AuthRequest {
  params: {
    user_id: string;
  };
}

interface ChatModel {
  id: string;
  sender_id: string;
  receiver_id: string;
  messageType: string;
  data: string;
  create_timestamp: number;
}

interface ChatsResponse {
  chats: ChatModel[];
}

chatRouter.get(
  "/oldChats/:user_id",
  async (req: ChatRequest, res: Response) => {
    /**
    #swagger.responses[200] = {
      schema:  { $ref: "#/components/schemas/ChatsResponse" }
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
        { sender_id: user_A, receiver_id: user_B },
        { sender_id: user_B, receiver_id: user_A },
      ],
    });
    const chats: IChat[] = [];

    for (const key in _chats) {
      if (Object.prototype.hasOwnProperty.call(_chats, key)) {
        const _element = _chats[key];
        const element: ChatModel = {
          id: _element.id,
          sender_id: _element.sender_id,
          receiver_id: _element.receiver_id,
          messageType: _element.messageType,
          data: _element.data,
          create_timestamp: _element.create_timestamp,
        };
        chats.push(element);
      }
    }

    res.status(200).json({ chats });
  }
);

export async function handleChat(socket: Socket, session: Session) {

  
}
