const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("client"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
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
      success_url: `${process.env.CLIENT_PROD_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_PROD_URL}/cart`,
      client_reference_id: `ORD-${Date.now()}`,
      customer_email: req.body.customerEmail,
      payment_intent_data: {
        receipt_email: req.body.customerEmail,
      },
    });

    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

app.post("/success", async (req, res) => {
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
    const receiptNumber = session.payment_intent.charges.data[0].receipt_number;

    res.send(
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

// app.listen(process.env.PORT || 4000, () =>
//   console.log("Backend server is running!")
// );

module.exports = app;
