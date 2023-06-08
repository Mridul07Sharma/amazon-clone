// eslint-disable-next-line max-len
const URL="sk_test_51NGLTySD0HqlvIuPaYVbOSrfioBgrAfLVKviELC42aiz3jxmcarJfU501B5eegJg47T3slF4oQ0M7hBRBhm1IEdV00XFbfcajf";
const functions = require("firebase-functions");
const express = require("express:");
const cors = require("cors");
const stripe=require("stripe")(URL);
// API
// App config
const app = express();
// Middlewares
app.use(cors({origin: true}));
app.use(express.json());
// API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received BOOM!! For this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents
      .create({amount: total, currency: "inr"});
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen Command
exports.api = functions.https.onRequest(app);
//  Example api
//  http://127.0.0.1:5001/clone-495fd/us-central1/api
// ************************************************************** */
// firebase emulator:start command is used to start the back end
//  ************************************************************** */
//  ************************************************************** */
//  After completing the project run
//  firebase deploy --only functions
//  and change the baseURL in axios.js file
//  ************************************************************** */
