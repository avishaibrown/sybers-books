const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

require("../server")(app);

app.use(cors());
app.use(express.static("client"));
app.use(express.json());

exports.api = functions.https.onRequest(app);
