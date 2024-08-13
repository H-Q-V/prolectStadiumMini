const express = require("express");
const webhook = express.Router();
const payment = require("../controllers/paymentController");
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");


webhook.post(
  "/payment",
  middlewareController.verifyToken,
  payment.createPayment
);
webhook.all("/status-payment", payment.AuthenPay);

module.exports = webhook;
