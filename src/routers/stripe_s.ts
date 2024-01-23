import Stripe from "stripe";
import express, { Router } from "express";

export const stripeRouter = Router();

const stripe = new Stripe(`${process.env.stripe_secret_key}`, {
  typescript: true,
});

// Stripe payment webhook
stripeRouter.post(
  "/stripe_webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const stripe = require("stripe");
    const endpointSecret = process.env.stripe_endpoint_secret;

    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle payment intent
        break;
      default:
      // Unexpected event type
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

stripeRouter.get(
  "/config",
  (_: express.Request, res: express.Response): void => {
    // Serve checkout page.
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

stripeRouter.post(
  "/create-payment-intent",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const {
      currency,
      paymentMethodType,
      paymentMethodOptions,
    }: {
      currency: string;
      paymentMethodType: string;
      paymentMethodOptions?: object;
    } = req.body;
    // Create a PaymentIntent with the order amount and currency.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 5999,
      currency,
      // Each payment method type has support for different currencies. In order to
      // support many payment method types and several currencies, this server
      // endpoint accepts both the payment method type and the currency as
      // parameters. To get compatible payment method types, pass
      // `automatic_payment_methods[enabled]=true` and enable types in your dashboard
      // at https://dashboard.stripe.com/settings/payment_methods.
      //
      // Some example payment method types include `card`, `ideal`, and `link`.
      payment_method_types:
        paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
    };

    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if (paymentMethodType === "acss_debit") {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: "sporadic",
            transaction_type: "personal",
          },
        },
      };
    } else if (paymentMethodType === "customer_balance") {
      params.payment_method_data = {
        type: "customer_balance",
      } as any;
      params.confirm = true;
      params.customer =
        req.body.customerId ||
        (await stripe.customers.create().then((data) => data.id));
    }

    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }

    try {
      const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create(params);

      // Send publishable key and PaymentIntent client_secret to client.
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });
    } catch (e: any) {
      res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  }
);

stripeRouter.get("/payment/next", async (req, res) => {
  const paymentIntent: any = req.query.payment_intent;
  const intent = await stripe.paymentIntents.retrieve(paymentIntent, {
    expand: ["payment_method"],
  });

  res.redirect(`/success?payment_intent_client_secret=${intent.client_secret}`);
});
