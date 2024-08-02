const express = require('express');
const webhook = express.Router();
const { handlePaymentWebhook } = require('../controllers/paymentController');
const middlewareController = require("../controllers/middlewareController");

webhook.all('/app', handlePaymentWebhook, middlewareController.verifyToken);

module.exports = webhook;
