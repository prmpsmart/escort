import { Response, Router } from "express";
import { Client } from "../models/clients";
import { Escort } from "../models/escorts";
import { Sessions, UserType } from "../services/sessions";
import { LoginRequest } from "./client/loginScreens";

export const paymentRouter = Router();
