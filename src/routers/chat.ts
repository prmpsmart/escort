import { Response, Router } from "express";
import { AuthRequest } from "../middleware/checkToken";
import Chats, { Chat, IChat } from "../models/chats";
import { Socket } from "socket.io";
import { Session, Sessions, UserType } from "../services/sessions";
import { Client, Clients } from "../models/clients";
import {
  cleanObject,
  getMediaLink,
  getUserByID,
  getUserType,
  objectId,
} from "../utils";
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

interface Contact {
  last_chat: string;
  image: string;
  id: string;
  name: string;
}

chatRouter.get("/contacts", async (req: AuthRequest, res: Response) => {
  /**
   #swagger.responses[200] = {
     schema:  { $ref: "#/components/schemas/ContactsResponse" }
    }
   */
  let _contacts: Record<string, ChatModel> | undefined = _.cloneDeep(
    req.session?.user.contacts
  );

  const contacts: Contact[] = [];

  if (_contacts) {
    for (const [contactId, chatModel] of Object.entries(_contacts)) {
      chatModel.id = contactId;

      let user = await getUserByID(contactId);
      if (user) {
        let name = "";
        let image = "";
        const userType = getUserType(user.userType as string);
        if (userType == UserType.Client) {
          user = user as Client;
          name = user.username;
          image = await getMediaLink(user.images[0]);
        } else if (userType == UserType.Escort) {
          user = user as Escort;
          name = user.workingName;
          image = await getMediaLink(user.personalDetails.image);
        } else if (userType == UserType.Admin) {
          name = (user as Admin).username;
        }

        const contact: Contact = {
          name: name,
          id: contactId,
          image: image,
          last_chat: chatModel.data,
        };
        contacts.push(contact);
      }
    }
  }
  return res.status(200).json({ contacts });
});

export async function handleChat(session: Session) {
  const socket = session.socket as Socket;

  socket.on("new_message", async (message: ChatModel): Promise<void> => {
    console.log(socket.id, message);
    if (session.user.id === message.sender_id) {
      const receiver_session = Sessions.getSessionByID(message.receiver_id);
      socket?.emit("new_message", message);
      if (receiver_session) {
        Chats.create(message);

        receiver_session.socket?.emit("new_message", message);

        console.log("emitted back to users");

        await save_user_last_chat(
          session.user,
          receiver_session.user.id,
          message
        );
        await save_user_last_chat(
          receiver_session.user,
          session.user.id,
          message
        );
      } else {
        if (message.sender_id != message.receiver_id) {
          const receiver: User | null = await getUserByID(message.receiver_id);
          if (receiver) {
            Chats.create(message);

            await save_user_last_chat(session.user, receiver.id, message);
            await save_user_last_chat(receiver, session.user.id, message);
          } else {
            socket.emit(
              "wrong_receiver_id",
              "Message receiver_id is not a valid user."
            );
            return;
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

async function save_user_last_chat(user: User, is: string, message: ChatModel) {
  try {
    if (user.contacts == null) user.contacts = {};

    user.contacts[user.id] = message;
    const userType = getUserType(user.userType ?? "");

    if (userType == UserType.Client) await (user as Client).save();
    else if (userType == UserType.Escort) await (user as Escort).save();
    else if (userType == UserType.Admin) await (user as Admin).save();
  } catch (error) {
    console.log(error);
  }
}
