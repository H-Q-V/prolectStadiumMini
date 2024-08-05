
const express = require('express');
const webhook = express.Router();
const payment = require('../controllers/paymentController')
const middlewareController = require("../controllers/middlewareController");

webhook.post('/payment', middlewareController.verifyToken, payment.createPayment)
webhook.all('/status-payment', payment.AuthenPay)

module.exports = webhook;

