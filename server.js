require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.static("client"));
app.use(express.json());

// Define a webhook endpoint
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        // Do something with the customer email, such as save it to your database
        console.log("Customer email:", customerEmail);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

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
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
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

app.listen(process.env.PORT || 4000, () =>
  console.log("Backend server is running!")
);
