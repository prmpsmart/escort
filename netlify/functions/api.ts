import serverless from "serverless-http";
import { app } from "../../src/app";

export async function handler(event, context) {
  return serverless(app)(event, context);
}
