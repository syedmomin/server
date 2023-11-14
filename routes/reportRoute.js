const express = require("express");
const router = express.Router();
const controllerPath = require("../controller/reportController");
const verifyToken = require("../middleware/auth").verifyToken;

router
  .route("/invoiceReport")
  .post(verifyToken, (req, res) => controllerPath.OrderInvoiceReport(req, res));
router
  .route("/ledgerReport")
  .post(verifyToken, (req, res) =>
    controllerPath.customerLedgerReport(req, res)
  );

module.exports = router;
