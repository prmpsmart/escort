import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import Chats, { Chat, IChat } from "../models/chats";
import { Socket } from "socket.io";
import { Session, Sessions } from "../services/sessions";
import { Clients } from "../models/clients";
import { objectId } from "../utils";
import { Admins } from "../models/admin";
import { Escorts } from "../models/escorts";
import { ChatModel, User } from "../models/common";

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

chatRouter.get("contacts", (req: AuthRequest, res: Response) => {
  const contacts = req.session?.user.contacts;
  return res.status(200).json({ contacts });
});

export async function handleChat(socket: Socket, session: Session) {
  socket.on("new_message", async (message: ChatModel): Promise<void> => {
    if (session.user.id === message.sender_id) {
      const receiver_session = Sessions.getSessionByID(message.receiver_id);
      if (receiver_session) {
        Chats.create(message);
        receiver_session.socket?.emit("new_message", message);

        if (session.user.contacts)
          session.user.contacts[receiver_session.user.id] = message;
        if (receiver_session.user.contacts)
          receiver_session.user.contacts[session.user.id] = message;
      } else {
        if (message.sender_id != message.receiver_id) {
          const receiver: User | null =
            (await Clients.findById(objectId(message.receiver_id))) ||
            (await Escorts.findById(objectId(message.receiver_id))) ||
            (await Admins.findById(objectId(message.receiver_id)));
          //
          if (receiver) {
            Chats.create(message);

            if (session.user.contacts)
              session.user.contacts[receiver.id] = message;
            if (receiver.contacts) receiver.contacts[session.user.id] = message;
          } else {
            socket.emit(
              "wrong_receiver_id",
              "Message receiver_id is not a valid user."
            );
          }
        } else {
          socket.emit(
            "invalid_message",
            "sender_id and receiver_id can not be the same."
          );
        }
      }
    } else {
      socket.emit(
        "wrong_sender_id",
        "Message sender_id is not same as User id"
      );
    }
  });
}
