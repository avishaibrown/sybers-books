const functions = require("firebase-functions");
const dotenv = require("dotenv");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.static("client"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("middleware executed");
  next();
});

exports.bigben = functions.https.onRequest((_, res) => {
  const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
      </head>
      <body>
        ${"BONG ".repeat(hours)}
      </body>
    </html>`);
});

exports.checkout = functions.https.onRequest(async (req, res) => {
  if (req.method === "PUT") {
    res.status(403).send("Forbidden!");
    return;
  }
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(200).send();
    return;
  }
  cors(req, res, async () => {
    try {
      const line_items = req.body.items.map((item) => {
        return {
          price_data: {
            unit_amount: item["STRIPE PRICE"],
            currency: "aud",
            product_data: {
              name: item.TITLE,
              description: item.AUTHOR,
              images: [item["IMAGE URL"]],
            },
          },
          quantity: 1,
        };
      });

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["AU", "NZ"] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "aud" },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ],
        line_items: line_items,
        mode: "payment",
        success_url: `${
          functions.config().stripe.success_url
        }/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${functions.config().stripe.cancel_url}/cart`,
        client_reference_id: `ORD-${Date.now()}`,
        customer_email: req.body.customerEmail,
        payment_intent_data: {
          receipt_email: req.body.customerEmail,
        },
      });

      functions.logger.log("Checkout response object:", res);

      res.status(200).send(
        JSON.stringify({
          url: session.url,
        })
      );
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  });
});

exports.success = functions.https.onRequest(async (req, res) => {
  if (req.method === "PUT") {
    res.status(403).send("Forbidden!");
    return;
  }
  cors(req, res, async () => {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.body.sessionId,
        {
          expand: ["payment_intent"],
        }
      );
      const name = session.customer_details.name;
      const email = session.customer_details.email;
      const orderNumber = session.client_reference_id;
      const receiptNumber =
        session.payment_intent.charges.data[0].receipt_number;

      functions.logger.log("Success response object:", res);

      res.status(200).send(
        JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerOrderNumber: orderNumber,
          customerReceiptNumber: receiptNumber,
        })
      );
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  });
});
