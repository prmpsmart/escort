import { Router } from "express";
import { stripe } from "./stripe_s";

export const paymentRouter = Router();

paymentRouter.post("/payment-intent", async (req, res) => {
  try {
    const amount = req.body.amount;
    const currency = req.body.currency;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
    });
    res.json({
      message: "Payment intent created",
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ops", error });
  }
});
