const functions = require("firebase-functions");
const dotenv = require("dotenv");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const express = require("express");
const cors = require("cors");
const serverApp = require("../server");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("client"));
app.use(express.json());

exports.checkServer = functions.https.onRequest((_, res) => {
  res.status(200).send("Server is running!");
});

exports.api = functions.https.onRequest(serverApp);
