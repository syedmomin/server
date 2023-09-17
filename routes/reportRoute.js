const express = require("express");
const router = express.Router();
const controllerPath = require("../controller/reportController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/invoiceReport")
  .post(verifyToken, (req, res) => controllerPath.OrderInvoiceReport(req, res));

module.exports = router;
