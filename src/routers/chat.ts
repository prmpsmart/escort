import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import Chats, { Chat, IChat } from "../models/chats";
import { Socket } from "socket.io";
import { Session, Sessions, UserType } from "../services/sessions";
import { Client, Clients } from "../models/clients";
import { cleanObject, objectId } from "../utils";
import { Admin, Admins } from "../models/admin";
import { Escort, Escorts } from "../models/escorts";
import { ChatModel, User } from "../models/common";
import _ from "lodash";

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

chatRouter.get("/contacts", (req: AuthRequest, res: Response) => {
  /**
   #swagger.responses[200] = {
     schema:  { $ref: "#/components/schemas/ContactsResponse" }
    }
   */
  let _contacts: Record<string, ChatModel> | undefined = _.cloneDeep(
    req.session?.user.contacts
  );

  const contacts: Record<string, ChatModel> = {};

  if (_contacts) {
    for (const [contactId, chatModel] of Object.entries(_contacts)) {
      chatModel.id = contactId;
      _contacts[contactId] = cleanObject(chatModel);
    }
  }
  return res.status(200).json({ contacts });
});

export async function handleChat(socket: Socket, session: Session) {
  socket.on("new_message", async (message: ChatModel): Promise<void> => {
    console.log(socket.id, message);
    if (session.user.id === message.sender_id) {
      const receiver_session = Sessions.getSessionByID(message.receiver_id);
      if (receiver_session) {
        Chats.create(message);
        receiver_session.socket?.emit("new_message", message);

        save_user_last_chat(
          session.user,
          session.userType,
          receiver_session.user.id,
          message
        );

        save_user_last_chat(
          receiver_session.user,
          receiver_session.userType,
          session.user.id,
          message
        );
      } else {
        if (message.sender_id != message.receiver_id) {
          let oId;
          try {
            oId = objectId(message.receiver_id);
          } catch (error) {
            socket.emit(
              "wrong_receiver_id",
              "Message receiver_id is not a valid user."
            );
            return;
          }

          const receiver: User | null =
            (await Clients.findById(oId)) ||
            (await Escorts.findById(oId)) ||
            (await Admins.findById(oId));
          //
          if (receiver) {
            Chats.create(message);

            save_user_last_chat(
              session.user,
              session.userType,
              receiver.id,
              message
            );

            let userType: UserType = UserType.Admin;
            if (receiver.userType == "client") userType = UserType.Client;
            else if (receiver.userType == "escort") userType = UserType.Escort;

            save_user_last_chat(receiver, userType, session.user.id, message);
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

async function save_user_last_chat(
  user: User,
  userType: UserType,
  is: string,
  message: ChatModel
) {
  try {
    if (user.contacts == null) user.contacts = {};

    user.contacts[user.id] = message;

    if (userType == UserType.Client) await(user as Client).save();
    else if (userType == UserType.Escort) await(user as Escort).save();
    else if (userType == UserType.Admin) await(user as Admin).save();
  } catch (error) {
    console.log(error);
  }
}
