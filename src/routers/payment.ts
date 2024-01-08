import { Response, Router } from "express";
import { Client } from "../models/clients";
import { Escort } from "../models/escorts";
import { Sessions, UserType } from "../services/sessions";
import { clean, cleanObject, getMediaLinks, getUser } from "../utils";
import { LoginRequest } from "./client/loginScreens";

export const paymentRouter = Router();
