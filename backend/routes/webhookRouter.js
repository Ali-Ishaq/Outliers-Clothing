const express = require("express");
const webHooksController = require("../controller/stripeWebhook");
const webHookRouter = express.Router();

webHookRouter.post(
  "/",

  webHooksController.stripeWebhook
);

exports.route = webHookRouter;
