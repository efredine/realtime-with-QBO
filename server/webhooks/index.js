require("dotenv").config();
const crypto = require("crypto");

const webhooksVerifier = process.env.WEBHOOKS_VERIFIER;

function webhookHandler(req, res) {
  var webhookPayload = JSON.stringify(req.body);
  var signature = req.get("intuit-signature");

  const { path, body } = req;

  console.log("webhook", { path, signature, body });
  // console.log("webhook", { req });

  // var fields = ["realmId", "name", "id", "operation", "lastUpdated"];
  // var newLine = "\r\n";

  // if signature is empty return 401
  if (!signature) {
    return res.status(401).send("FORBIDDEN");
  }

  // if payload is empty, don't do anything
  if (!webhookPayload) {
    console.log("Got webhook but no payload.");
    return res.status(200).send("success");
  }

  /**
   * Validates the payload with the intuit-signature hash
   */
  const hash = crypto
    .createHmac("sha256", webhooksVerifier)
    .update(webhookPayload)
    .digest("base64");

  if (signature === hash) {
    console.log("The Webhook notification payload is :" + webhookPayload);
    return res.status(200).send("SUCCESS");
  }

  return res.status(401).send("FORBIDDEN");
}

function webhookMiddleware(req, res, next) {
  if (req.path.startsWith("/webhook")) {
    return webhookHandler(req, res);
  }
  next();
}

module.exports = { webhookMiddleware, webhookHandler };
